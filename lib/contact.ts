/** Shared form rules for the contact pop-up. */

export const CONTACT_INBOX = "ridonsrw@gmail.com";

export const SENDER_TYPES = ["Individual", "Organization"] as const;
export type SenderType = (typeof SENDER_TYPES)[number];

export const REASONS = [
  "Partnership",
  "Investment",
  "Become a motari (rider)",
  "Passenger support",
  "Media or press",
  "General inquiry",
  "Other",
] as const;
export type Reason = (typeof REASONS)[number];

export type ContactPayload = {
  senderType: SenderType;
  name: string;
  phone: string;
  email: string;
  reason: Reason;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s()-]{7,20}$/;

export const LIMITS = { name: 120, email: 160, phone: 20, message: 3000 };

export function validateContact(input: Partial<Record<keyof ContactPayload, unknown>>): {
  data?: ContactPayload;
  errors: ContactErrors;
} {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const senderType = str(input.senderType) as SenderType;
  const name = str(input.name);
  const phone = str(input.phone);
  const email = str(input.email);
  const reason = str(input.reason) as Reason;
  const message = str(input.message);
  const errors: ContactErrors = {};

  if (!SENDER_TYPES.includes(senderType)) errors.senderType = "Choose individual or organization.";
  if (name.length < 2) errors.name = senderType === "Organization" ? "Enter the organization's name." : "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = "That name is too long.";
  if (!PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number.";
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = "Enter a valid email address.";
  if (!REASONS.includes(reason)) errors.reason = "Choose a reason.";
  if (message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  else if (message.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`;

  if (Object.keys(errors).length > 0) return { errors };
  return { data: { senderType, name, phone, email, reason, message }, errors };
}
