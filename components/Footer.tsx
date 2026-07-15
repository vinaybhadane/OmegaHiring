"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase, ShieldCheck, Globe, Send, Mail,
  MapPin, Star, ArrowRight, CheckCircle2
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
    <footer className="bg-slate-950 text-slate-300 relative border-t border-slate-800" role="contentinfo">

      {/* ── TOP NEWSLETTER / COMMUNITY STRIP ────────────────────── */}
      <div className="container-lg pt-12 pb-6">
        <div className="relative overflow-hidden bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          {/* Decorative Blob */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <Send size={10} /> Live Telegram Alerts
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Join India's Fastest Growing WFH Community</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Get real-time alerts on verified work-from-home jobs, direct HR schedules, and career guidance.
            </p>
          </div>
          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3">
            <a
              href="https://t.me/omegaofts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              aria-label="Join CareerMitra on Telegram"
            >
              <Send size={15} /> Join Telegram Channel
            </a>
            <a
              href="mailto:support@careers.abhyasmitra.in"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer"
            >
              <Mail size={15} /> Email Support
            </a>
          </div>
        </div>
      </div>

      {/* ── HIGHLIGHTS GRID ───────────────────────────────────── */}
      <div className="border-t border-b border-slate-800/80 bg-slate-900/30">
        <div className="container-lg py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-tight">{text}</p>
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
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Briefcase size={18} className="text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Career<span className="text-blue-400">Mitra</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-medium">
              India's most trusted platform for verified remote jobs, work-from-home opportunities, and online internships. Your career starts here.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:support@careers.abhyasmitra.in"
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-blue-400 transition-colors font-semibold"
              >
                <Mail size={14} className="text-blue-400 shrink-0" />
                support@careers.abhyasmitra.in
              </a>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 w-fit">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-1.5" />
                Support HelpDesk Active
              </div>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-5 pb-2 border-b border-slate-800">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs sm:text-sm text-slate-400 hover:text-white transition-all duration-200 flex items-center gap-2 group/link"
                    >
                      <ArrowRight size={12} className="text-slate-600 group-hover/link:text-blue-400 group-hover/link:translate-x-1 transition-all shrink-0" />
                      <span className="group-hover/link:translate-x-0.5 transition-transform">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUST BADGES / SECURE GATEWAY ───────────────────────── */}
      <div className="border-t border-slate-800/80 bg-slate-950/60">
        <div className="container-lg py-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {[
                { icon: ShieldCheck, label: "SSL Secured Payment Gateway" },
                { icon: Globe, label: "Pan-India Remote Network" },
                { icon: CheckCircle2, label: "100% Verified Profiles" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-full">
                  <Icon size={14} className="text-blue-400" />
                  {label}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-bold">
              © {year || 2026} CareerMitra · A Platform by AbhyasMitra
            </p>
          </div>
        </div>
      </div>

      {/* ── LEGAL DISCLAIMER BOTTOM BAR ────────────────────────── */}
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="container-lg py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-600 text-center sm:text-left leading-relaxed max-w-2xl font-medium">
            <b>Disclaimer:</b> CareerMitra is a verified career service portal. We charge a minimal profile processing fee of ₹50. We do not guarantee final employment outcomes, which depend solely on hiring company interviews.
          </p>
          <div className="flex items-center gap-4 shrink-0 font-bold">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-blue-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-600 hover:text-blue-400 transition-colors">Terms</Link>
            <Link href="/refund" className="text-xs text-slate-600 hover:text-blue-400 transition-colors">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}