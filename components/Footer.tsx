"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase, ShieldCheck, Globe, Send, Mail, ExternalLink,
  MapPin, Phone, Users, Star, ArrowRight, CheckCircle2
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Apply for Jobs", href: "/dashboard" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
  "Job Categories": [
    { label: "Work From Home Jobs", href: "/dashboard" },
    { label: "Remote Internships", href: "/dashboard" },
    { label: "Fresher Jobs", href: "/dashboard" },
    { label: "Part-Time Jobs", href: "/dashboard" },
  ],
};

const highlights = [
  { icon: CheckCircle2, text: "12,000+ Verified Members" },
  { icon: Briefcase, text: "500+ Remote Jobs Listed" },
  { icon: MapPin, text: "All 28 States Covered" },
  { icon: Star, text: "94% Placement Success Rate" },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-900" role="contentinfo">

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <div className="border-b border-slate-800 bg-slate-800/50">
        <div className="container-lg py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-blue-400" />
                </div>
                <p className="text-xs font-semibold text-slate-300 leading-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ───────────────────────────────────── */}
      <div className="container-lg py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand col */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group" aria-label="CareerMitra">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase size={18} className="text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Career<span className="text-blue-400">Mitra</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              India's most trusted platform for verified remote jobs, work-from-home opportunities, and online internships. Your career starts here.
            </p>

            {/* Telegram CTA */}
            <a
              href="https://t.me/omegaofts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md"
              aria-label="Join CareerMitra on Telegram"
            >
              <Send size={14} /> Join on Telegram
            </a>

            {/* Contact */}
            <div className="mt-5 space-y-2">
              <a
                href="mailto:support@careers.abhyasmitra.in"
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-400 transition-colors"
              >
                <Mail size={13} className="text-blue-500 shrink-0" />
                support@careers.abhyasmitra.in
              </a>
              <a
                href="https://t.me/omegaofts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-400 transition-colors"
              >
                <ExternalLink size={13} className="text-blue-500 shrink-0" />
                Telegram Support Channel
              </a>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-800">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight size={11} className="text-slate-600 group-hover:text-blue-400 transition-colors shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUST BADGES ──────────────────────────────────── */}
      <div className="border-t border-slate-800 bg-slate-800/30">
        <div className="container-lg py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {[
                { icon: ShieldCheck, label: "SSL Encrypted" },
                { icon: Globe, label: "Pan-India" },
                { icon: CheckCircle2, label: "Verified Jobs" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Icon size={13} className="text-blue-500" />
                  {label}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600">
              © {year || 2025} CareerMitra · A platform by AbhyasMitra
            </p>
          </div>
        </div>
      </div>

      {/* ── LEGAL BOTTOM BAR ──────────────────────────────── */}
      <div className="border-t border-slate-800/50">
        <div className="container-lg py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            CareerMitra is a career portal. We do not guarantee employment outcomes. All listed jobs are independently verified.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-blue-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-600 hover:text-blue-400 transition-colors">Terms</Link>
            <Link href="/refund" className="text-xs text-slate-600 hover:text-blue-400 transition-colors">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}