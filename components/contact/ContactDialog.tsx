"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  CONTACT_INBOX,
  LIMITS,
  REASONS,
  SENDER_TYPES,
  validateContact,
  type ContactErrors,
  type Reason,
  type SenderType,
} from "@/lib/contact";
import { sendContact } from "@/lib/sendContact";
import styles from "./ContactDialog.module.css";

type Props = { open: boolean; initialReason: Reason; onClose: () => void };
type Status = "idle" | "sending" | "sent";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={styles.error}>
      {message}
    </p>
  );
}

export default function ContactDialog({ open, initialReason, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [senderType, setSenderType] = useState<SenderType>(
    initialReason === "Partnership" || initialReason === "Investment" ? "Organization" : "Individual",
  );
  const [values, setValues] = useState({ name: "", phone: "", email: "", reason: initialReason as string, message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const set = (field: keyof typeof values, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateContact({ ...next, senderType }).errors);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");
    const { data, errors: found } = validateContact({ ...values, senderType });
    setErrors(found);
    if (!data) {
      const first = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const honeypot = String(new FormData(e.currentTarget).get("rd_trap_field") ?? "");
      await sendContact(data, honeypot);
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setServerError(
        err instanceof Error && err.message
          ? err.message
          : `We couldn't send your message. Please email us at ${CONTACT_INBOX}.`,
      );
    }
  };

  const isOrg = senderType === "Organization";
  const title = values.reason === "Partnership" ? "Partner with Ridons" : "Talk to the Ridons team";

  const field = (name: keyof ContactErrors) => ({
    id: `${id}-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-err` : undefined,
  });

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.panel} tabIndex={-1} autoFocus>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {status === "sent" ? (
          <div className={styles.success} role="status">
            <span className={styles.tick} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 5 5 9-10" />
              </svg>
            </span>
            <h2 id={`${id}-title`} className={styles.title}>
              Message sent
            </h2>
            <p className={styles.sub}>
              Thank you, {isOrg ? values.name : values.name.split(" ")[0]}. The Ridons team has your message and will reply to{" "}
              <b>{values.email}</b>.
            </p>
            <button type="button" className={styles.submit} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.head}>
              <h2 id={`${id}-title`} className={styles.title}>
                {title}
              </h2>
              <p className={styles.sub}>Fill in the form and we&apos;ll get back to you by email or phone.</p>
            </div>

            <fieldset className={styles.segment}>
              <legend className={styles.label}>I&apos;m writing as</legend>
              <div className={styles.segmentTrack}>
                {SENDER_TYPES.map((t) => (
                  <label key={t} className={`${styles.segmentOption} ${senderType === t ? styles.segmentOn : ""}`}>
                    <input
                      type="radio"
                      name="senderType"
                      value={t}
                      checked={senderType === t}
                      onChange={() => setSenderType(t)}
                    />
                    {t === "Individual" ? "An individual" : "An organization"}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.field}>
              <label htmlFor={`${id}-name`} className={styles.label}>
                {isOrg ? "Organization name" : "Full name"}
              </label>
              <input
                {...field("name")}
                className={styles.input}
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete={isOrg ? "organization" : "name"}
                maxLength={LIMITS.name}
                placeholder={isOrg ? "e.g. Kigali Savings Cooperative" : "e.g. Aline Uwase"}
              />
              <FieldError id={`${id}-name-err`} message={errors.name} />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={`${id}-phone`} className={styles.label}>
                  Phone number
                </label>
                <input
                  {...field("phone")}
                  className={styles.input}
                  type="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  autoComplete="tel"
                  maxLength={LIMITS.phone}
                  placeholder="+250 7XX XXX XXX"
                />
                <FieldError id={`${id}-phone-err`} message={errors.phone} />
              </div>
              <div className={styles.field}>
                <label htmlFor={`${id}-email`} className={styles.label}>
                  Email
                </label>
                <input
                  {...field("email")}
                  className={styles.input}
                  type="email"
                  inputMode="email"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  autoComplete="email"
                  maxLength={LIMITS.email}
                  placeholder="you@example.com"
                />
                <FieldError id={`${id}-email-err`} message={errors.email} />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}-reason`} className={styles.label}>
                Reason
              </label>
              <div className={styles.selectWrap}>
                <select
                  {...field("reason")}
                  className={`${styles.input} ${styles.select}`}
                  value={values.reason}
                  onChange={(e) => set("reason", e.target.value)}
                >
                  {REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <FieldError id={`${id}-reason-err`} message={errors.reason} />
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}-message`} className={styles.label}>
                Message
              </label>
              <textarea
                {...field("message")}
                className={`${styles.input} ${styles.textarea}`}
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                maxLength={LIMITS.message}
                rows={5}
                placeholder="How can we work together?"
              />
              <div className={styles.messageFoot}>
                <FieldError id={`${id}-message-err`} message={errors.message} />
                <span className={styles.count}>
                  {values.message.length}/{LIMITS.message}
                </span>
              </div>
            </div>

            {/* Honeypot for bots */}
            <input type="text" name="rd_trap_field" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />

            {serverError && (
              <p className={styles.serverError} role="alert">
                {serverError}
              </p>
            )}

            <button type="submit" className={styles.submit} disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" /> Sending…
                </>
              ) : (
                "Send message"
              )}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
