"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { Mail, Send, MessageCircle, Clock, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

// Note: metadata must be in a server component. For a client component, 
// define metadata in a separate layout or use Head. This page exports metadata
// but also uses useState — we keep metadata export for Next.js to pick up.

const contactFaqs = [
  { q: "How long does it take to get a response?", a: "Our support team typically responds within 24–48 business hours. For urgent matters, Telegram is the fastest channel." },
  { q: "I paid but haven't received a confirmation. What should I do?", a: "Please send your UTR/transaction ID and a payment screenshot to our support email or Telegram. We'll resolve it within 48 hours." },
  { q: "Can I change my application after submitting?", a: "Applications cannot be edited after submission. You may submit a new application for different roles. Each application requires a separate processing fee." },
  { q: "When will I be contacted after applying?", a: "Shortlisted candidates are contacted via WhatsApp within 24–48 hours of application review. Ensure your phone number is correct." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire this to an email API or Firebase
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container-lg max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Get Help</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Have a question or need support? We're here to help. Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Contact cards */}
          <a href="mailto:support@careers.abhyasmitra.in" className="card p-6 text-center hover:border-indigo-300 group">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-100 transition-colors">
              <Mail size={22} className="text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Email Support</h3>
            <p className="text-xs text-slate-500 mb-2">For detailed queries</p>
            <p className="text-sm text-indigo-600 font-semibold break-all">support@careers.abhyasmitra.in</p>
          </a>

          <a href="https://t.me/omegaofts" target="_blank" rel="noopener noreferrer" className="card p-6 text-center hover:border-indigo-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
              <Send size={22} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Telegram</h3>
            <p className="text-xs text-slate-500 mb-2">Fastest response channel</p>
            <p className="text-sm text-indigo-600 font-semibold">@omegaofts</p>
          </a>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock size={22} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Response Time</h3>
            <p className="text-xs text-slate-500 mb-2">We reply promptly</p>
            <p className="text-sm text-emerald-600 font-semibold">Within 24–48 hours</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Message Received!</h3>
              <p className="text-slate-500 text-sm">We'll get back to you within 24–48 hours. For faster support, use Telegram @omegaofts.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Subject *</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 appearance-none"
                >
                  <option value="">Select a topic</option>
                  <option>Application Status Inquiry</option>
                  <option>Payment Issue</option>
                  <option>Account Problem</option>
                  <option>Job Opportunity Question</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your issue or question in detail…"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 placeholder:text-slate-400 resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full py-4">
                <MessageCircle size={18} /> Send Message
              </button>
              <p className="text-xs text-slate-400 text-center">We respect your privacy and will never share your information.</p>
            </form>
          )}
        </div>

        {/* FAQ */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Questions</h2>
          <div>
            {contactFaqs.map(({ q, a }, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {q}
                  {openFaq === i ? <ChevronUp size={18} className="text-indigo-600 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && <p className="faq-answer">{a}</p>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
