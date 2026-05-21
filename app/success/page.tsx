"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Share2, Copy, Send, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

export default function SuccessPage() {
  const [copied, setCopied] = useState(false);
  const [regId, setRegId] = useState("");

  // 🎯 Generate Unique Registration ID
  useEffect(() => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    setRegId(`OH-${randomDigits}`);
  }, []);

  // 📝 Official Sharing Message
  const message = `🚀 I just joined OmegaHiring! 

My Registration ID: ${regId}
Finally found a verified platform for genuine Remote Tasks.

✅ Daily Payouts
✅ 100% Verified Work
✅ Remote Opportunities

Apply here to start your career journey: 
👉 https://omegahiring.vercel.app`;

  const copyText = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 pb-12 px-4 flex items-center justify-center">
      
      {/* --- BACKGROUND DECOR --- */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-indigo-100 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 max-w-xl w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-8 md:p-12 text-center"
      >
        
        {/* SUCCESS ICON */}
        <motion.div 
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
          className="w-20 h-20 md:w-24 md:h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-100"
        >
          <CheckCircle2 size={48} />
        </motion.div>

        {/* HEADLINE */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Application <br />
          <span className="text-emerald-500">Successfully Sent!</span>
        </h1>

        {/* --- REGISTRATION ID BADGE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 inline-flex flex-col items-center bg-slate-900 px-8 py-3 rounded-2xl shadow-xl shadow-slate-200"
        >
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Your Registration ID</span>
          <span className="text-2xl font-mono font-bold text-white tracking-widest">{regId || "GENERATING..."}</span>
        </motion.div>

        {/* STATUS INFO */}
        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            Verification is in progress. Our HR team will contact you via <span className="text-indigo-600 font-bold text-lg">Email</span> with your selection details within 24 hours. Please check your spam folder if you do not receive it.
          </p>
        </div>

        {/* IMPORTANT NOTE */}
        <div className="mt-6 flex items-start gap-3 text-left bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
          <ShieldCheck className="text-indigo-600 shrink-0" size={20} />
          <p className="text-[11px] md:text-xs text-indigo-700 font-bold leading-tight uppercase tracking-wider">
            Take a screenshot of this ID for future reference. To apply for more roles, please submit a new application.
          </p>
        </div>

        {/* --- SHARING SECTION --- */}
        <div className="mt-12 pt-8 border-t border-slate-50">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Share2 size={18} className="text-slate-400" />
            <span className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">Refer & Increase Selection Chance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:translate-y-[-2px] transition-all"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=https://omegahiring.vercel.app&text=${encodeURIComponent(message)}`}
              target="_blank"
              className="flex items-center justify-center gap-2 bg-[#0088cc] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:translate-y-[-2px] transition-all"
            >
              <Send size={18} /> Telegram
            </a>

            {/* Copy Button */}
            <button
              onClick={copyText}
              className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all border-2 
                ${copied 
                  ? "bg-emerald-50 border-emerald-500 text-emerald-600" 
                  : "bg-white border-slate-100 text-slate-700 hover:border-indigo-600 hover:text-indigo-600"
                }`}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* GO BACK TO HOME */}
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-10 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1 mx-auto hover:text-indigo-600 transition-colors"
        >
          Back to Home <ArrowRight size={14} />
        </button>

      </motion.div>
    </main>
  );
}