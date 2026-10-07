import { CONTACT_INBOX, type ContactPayload } from "./contact";

/**
 * Delivers a contact message to the Ridons inbox through Web3Forms (https://web3forms.com).
 * The access key is tied to ridonsrw@gmail.com and is safe to expose: it can only send
 * messages *to* that inbox. Web3Forms' free plan requires submitting from the browser.
 */
const ENDPOINT = "https://api.web3forms.com/submit";
const FALLBACK = `We couldn't send your message right now. Please email us at ${CONTACT_INBOX}.`;

export async function sendContact(data: ContactPayload, honeypot: string) {
  // A bot filled the hidden trap field: pretend it worked and send nothing.
  if (honeypot.trim() !== "") return;

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    throw new Error(
      process.env.NODE_ENV === "development"
        ? "Email isn't set up yet: add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local, then restart the dev server."
        : FALLBACK,
    );
  }

  // Use Web3Forms' standard field names and FormData, exactly as their docs recommend.
  const form = new FormData();
  form.append("access_key", accessKey);
  form.append("subject", `[Ridons] ${data.reason}: ${data.name}`);
  form.append("from_name", "Ridons website");
  form.append("name", data.name);
  form.append("email", data.email);
  form.append("phone", data.phone);
  form.append("writing_as", data.senderType);
  form.append("reason", data.reason);
  form.append("message", data.message);

  let res: Response;
  try {
    res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: form });
  } catch {
    throw new Error("Couldn't reach the server. Check your internet connection and try again.");
  }

  const json = await res.json().catch(() => null);
  if (res.status === 429) throw new Error("Too many messages right now. Please try again in a few minutes.");
  if (!res.ok || !json?.success) {
    const detail: string | undefined = json?.body?.message ?? json?.message;
    // Web3Forms' spam filter rejects fake email addresses and gibberish with this message.
    if (detail && /security reasons/i.test(detail)) {
      throw new Error(
        "Our spam filter stopped this message. Please check that your email address is real and spelled correctly, and write your message in full sentences.",
      );
    }
    throw new Error(process.env.NODE_ENV === "development" && detail ? `Web3Forms (HTTP ${res.status}): ${detail}` : FALLBACK);
  }
}
