"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, ShieldCheck, Globe, Send, Mail, Phone, ExternalLink } from "lucide-react";

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

const trustBadges = [
  { icon: ShieldCheck, label: "SSL Encrypted", sub: "AES-256 Security" },
  { icon: Globe, label: "Pan-India Access", sub: "Work Remotely" },
  { icon: Briefcase, label: "Verified Listings", sub: "Manually Reviewed" },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300" role="contentinfo">

      {/* ── TOP STRIP ─────────────────────────────────────── */}
      <div className="border-b border-slate-800">
        <div className="container-lg py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustBadges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{label}</p>
                <p className="text-xs text-slate-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN FOOTER ───────────────────────────────────── */}
      <div className="container-lg py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group" aria-label="OmegaHiring">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Briefcase size={16} className="text-white" />
              </div>
              <span className="text-lg font-extrabold text-white">
                Omega<span className="text-indigo-400">Hiring</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              India's trusted platform for verified remote jobs, work-from-home opportunities, and online internships.
            </p>

            {/* Telegram */}
            <a
              href="https://t.me/omegaofts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
              aria-label="Join our Telegram channel"
            >
              <Send size={15} /> @omegaofts
            </a>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <a href="mailto:support@careers.abhyasmitra.in" className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
            <Mail size={15} className="text-indigo-500" />
            support@careers.abhyasmitra.in
          </a>
          <a href="https://t.me/omegaofts" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
            <ExternalLink size={15} className="text-indigo-500" />
            Telegram Support
          </a>
        </div>
      </div>

      {/* ── BOTTOM BAR ────────────────────────────────────── */}
      <div className="border-t border-slate-800">
        <div className="container-lg py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year || 2024} OmegaHiring. All rights reserved. A platform by AbhyasMitra.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-indigo-400 transition-colors">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}