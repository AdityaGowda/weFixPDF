"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function ContactForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const subject = subjectRef.current?.value ?? "";
    const message = messageRef.current?.value ?? "";

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    const mailto =
      `mailto:hello@wefixpdf.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest text-[10px]"
          >
            Your Name
          </label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest text-[10px]"
          >
            Email Address
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest text-[10px]"
        >
          Subject
        </label>
        <select
          ref={subjectRef}
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-colors appearance-none"
        >
          <option value="">Select a topic…</option>
          <option value="Tool bug">Tool bug</option>
          <option value="Privacy question">Privacy question</option>
          <option value="Business inquiry">Business inquiry</option>
          <option value="Feature request">Feature request</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest text-[10px]"
        >
          Message
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Describe your question or issue in detail…"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-primary text-white font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-primary/25"
      >
        Send Message <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
