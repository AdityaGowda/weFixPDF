"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#1a1a1e] border border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] text-[#0F0F0F] dark:text-[#F8FAFC] placeholder-[#9CA3AF] dark:placeholder-[#64748B] text-[14px] " +
  "focus:outline-none focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3] focus:ring-offset-0 transition-colors";

const labelClass = "block text-[12px] font-medium text-[#374151] dark:text-[#94A3B8] mb-1.5";

export default function ContactForm() {
  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name    = nameRef.current?.value    ?? "";
    const email   = emailRef.current?.value   ?? "";
    const subject = subjectRef.current?.value ?? "";
    const message = messageRef.current?.value ?? "";
    const body    = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href =
      `mailto:hello@wefixpdf.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Your name</label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email address</label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>Subject</label>
        <select
          ref={subjectRef}
          id="subject"
          name="subject"
          required
          className={`${inputClass} appearance-none`}
        >
          <option value="">Select a topic…</option>
          <option value="Tool bug">Tool bug</option>
          <option value="Privacy question">Privacy question</option>
          <option value="Business inquiry">Business inquiry</option>
          <option value="Feature request">Feature request</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Describe your question or issue in detail…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button type="submit" className="btn-primary">
        Send message <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
