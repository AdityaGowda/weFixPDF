"use client";

import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#1a1a1e] border border-[rgba(0,0,0,0.12)] dark:border-[rgba(255,255,255,0.12)] text-[#0F0F0F] dark:text-[#F8FAFC] placeholder-[#9CA3AF] dark:placeholder-[#64748B] text-[14px] " +
  "focus:outline-none focus:border-[#2D5BE3] focus:ring-2 focus:ring-[#2D5BE3] focus:ring-offset-0 transition-colors";

const labelClass = "block text-[12px] font-medium text-[#374151] dark:text-[#94A3B8] mb-1.5";

export default function ContactForm() {
  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      subject: subjectRef.current?.value,
      message: messageRef.current?.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("Message sent successfully!");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 rounded-xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Thank you for reaching out. We&apos;ll get back to you within 24–48 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-blue-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
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

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? (
          <>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>
        ) : (
          <>Send message <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}
