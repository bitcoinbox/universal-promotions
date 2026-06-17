"use client";

import { useState } from "react";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";
import type { InquiryTopic } from "@/types";

const topicOrder: InquiryTopic[] = ["general", "tickets", "sponsorship", "media-credentials", "fighter-management"];

type FieldKey = "name" | "email" | "message";
type Errors = Partial<Record<FieldKey, string>>;

const inputClass =
  "w-full rounded-token border border-line bg-bg-2 px-3.5 py-3 text-[length:var(--step-0)] text-fg placeholder:text-fg-3 transition-colors hover:border-line-2 " +
  "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 aria-[invalid=true]:border-[var(--live)]";

/**
 * Prototype contact / press-credentials form. Fully client-validated (required fields +
 * email format + message length) with accessible errors; it does not transmit anything —
 * on success it shows a clear demo confirmation. `defaultTopic` lets callers prefill.
 */
export function ContactForm({ defaultTopic = "general" }: { defaultTopic?: InquiryTopic }) {
  const { t } = useI18n();
  const [values, setValues] = useState({ name: "", email: "", organization: "", topic: defaultTopic, message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = t.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = t.contact.errEmail;
    if (values.message.trim().length < 10) e.message = t.contact.errMessage;
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true); // prototype: nothing is sent
      return;
    }
    // Move focus to the first invalid field (WCAG 3.3.1 / 2.4.3).
    const firstInvalid = (["name", "email", "message"] as const).find((k) => e[k]);
    if (firstInvalid) document.getElementById(`cf-${firstInvalid}`)?.focus();
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-token-lg border border-[color-mix(in_srgb,var(--ok)_40%,transparent)] bg-[color-mix(in_srgb,var(--ok)_8%,transparent)] p-6"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--ok)]" />
        <p className="text-[length:var(--step-0)] text-fg">{t.contact.success}</p>
      </div>
    );
  }

  const label = (text: string, required = false) => (
    <span className="mb-1.5 block text-[length:var(--step--1)] font-medium text-fg-2">
      {text}
      {!required && <span className="ml-1 text-fg-3">({t.contact.optional})</span>}
    </span>
  );

  const errorMsg = (key: FieldKey) =>
    errors[key] ? (
      <span id={`${key}-error`} role="alert" className="mt-1 block text-[length:var(--step--2)] text-[var(--live)]">
        {errors[key]}
      </span>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="cf-name">
          {label(t.contact.name, true)}
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          {errorMsg("name")}
        </label>
        <label htmlFor="cf-email">
          {label(t.contact.email, true)}
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          {errorMsg("email")}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="cf-org">
          {label(t.contact.organization)}
          <input
            id="cf-org"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={(e) => setValues((v) => ({ ...v, organization: e.target.value }))}
            className={inputClass}
          />
        </label>
        <label htmlFor="cf-topic">
          {label(t.contact.topic, true)}
          <div className="relative">
            <select
              id="cf-topic"
              value={values.topic}
              onChange={(e) => setValues((v) => ({ ...v, topic: e.target.value as InquiryTopic }))}
              className={cn(inputClass, "appearance-none pr-10")}
            >
              {topicOrder.map((topic) => (
                <option key={topic} value={topic}>
                  {t.contact.topics[topic]}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-3"
            />
          </div>
        </label>
      </div>

      <label htmlFor="cf-message">
        {label(t.contact.message, true)}
        <textarea
          id="cf-message"
          rows={5}
          required
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass, "resize-y")}
        />
        {errorMsg("message")}
      </label>

      <p className="text-[length:var(--step--2)] text-fg-3">{t.contact.demoNote}</p>
      <Button type="submit" className="self-start">
        <Send className="size-4" />
        {t.contact.send}
      </Button>
    </form>
  );
}
