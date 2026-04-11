"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, ShieldCheck, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-100 pt-12 pb-6 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* --- BRAND NAME --- */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Omega<span className="text-indigo-600">Hiring</span>
          </h2>
        </div>

        {/* --- TELEGRAM SECTION (Always Blue Background) --- */}
        <motion.div 
          whileHover={{ scale: 1.03, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <a 
            href="https://t.me/omegaofts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-indigo-600 px-8 py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all duration-300 group"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <Send size={18} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-100">Join Official Channel</p>
              <p className="text-base font-bold text-white">@omegaofts</p>
            </div>
          </a>
        </motion.div>

        {/* --- OFFICIAL TRUST DISCLOSURES --- */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-50 pt-10">
          <div className="flex flex-col items-center">
            <ShieldCheck size={24} className="text-indigo-500 mb-3" />
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Verified Opportunities</p>
            <p className="text-[10px] text-slate-400 mt-1">Pre-vetted tasks for maximum safety.</p>
          </div>
          <div className="flex flex-col items-center">
            <Globe size={24} className="text-indigo-500 mb-3" />
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Pan-India Access</p>
            <p className="text-[10px] text-slate-400 mt-1">Remote work from any location.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[11px] font-black mb-3">₹</div>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Daily Payouts</p>
            <p className="text-[10px] text-slate-400 mt-1">Fast and secure payment settlements.</p>
          </div>
        </div>

        {/* --- FINAL FOOTNOTE --- */}
        <div className="mt-12 text-[10px] text-slate-400 tracking-[0.2em] font-medium uppercase">
          © {currentYear} OmegaHiring • Professional Remote Portal
        </div>

      </div>
    </footer>
  );
}