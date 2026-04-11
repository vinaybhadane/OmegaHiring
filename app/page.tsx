"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/config"; // Corrected import for auth instance
import { loginWithGoogle } from "@/firebase/auth"; // Corrected import for login helper
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Briefcase, Star, ArrowRight, Users, Loader2, Sparkles } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 🔐 Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const loggedInUser = await loginWithGoogle();
    if (loggedInUser) {
      router.push("/dashboard");
    }
  };

  return (
    <main className="relative min-h-screen bg-white text-slate-900 overflow-hidden flex flex-col items-center justify-center px-6">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent z-0" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        
        {/* --- TRUST BADGE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-8"
        >
          <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" />
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Trusted by 10,000+ Professionals
          </span>
        </motion.div>

        {/* --- MAIN HEADLINE --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Elevate Your <br />
            <span className="text-indigo-600 relative">
              Career Path
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-indigo-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
              </svg>
            </span>
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-slate-500 max-w-lg mx-auto leading-relaxed">
            OmegaHiring is the most secure way to connect with top-tier companies. {user ? "Ready to continue your application?" : "Log in to start your professional journey."}
          </p>
        </motion.div>

        {/* --- DYNAMIC AUTH SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 w-full max-w-md"
        >
          {authLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
          ) : user ? (
            // ✅ View for Authenticated Users
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center space-y-6">
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Authenticated Session</p>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  Welcome, {user.displayName?.split(" ")[0]} <Sparkles size={20} className="text-indigo-500" />
                </h2>
              </div>
              
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Go to Application <ArrowRight size={20} />
              </button>
            </div>
          ) : (
            // ❌ View for New/Logged Out Users
            <div className="bg-white p-2 rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl group hover:bg-indigo-600 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-xl">
                    <svg width="20" height="20" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.9-6.9C35.7 2.4 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l8 6.2C12.5 13.4 17.8 9.5 24 9.5z"/>
                      <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.8c-.3 1.9-1.9 4.8-5.4 6.7l8.3 6.5c4.8-4.4 7.8-10.8 7.8-16.7z"/>
                      <path fill="#4A90E2" d="M10.7 28.5c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-8-6.2C1 16.3 0 20 0 24s1 7.7 2.7 11.3l8-6.8z"/>
                      <path fill="#FBBC05" d="M24 48c6.5 0 12-2.1 16-5.8l-8.3-6.5c-2.3 1.6-5.3 2.7-7.7 2.7-6.2 0-11.5-3.9-13.4-9.4l-8 6.8C6.7 42.6 14.7 48 24 48z"/>
                    </svg>
                  </div>
                  <span className="font-bold tracking-wide">Continue with Google</span>
                </div>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* --- TRUST FOOTER --- */}
          <div className="mt-8 flex items-center justify-center gap-6 text-slate-400">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <ShieldCheck size={16} className="text-emerald-500" />
              AES-256 Encryption
            </div>
            <div className="w-1 h-1 bg-slate-200 rounded-full" />
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <Briefcase size={16} className="text-indigo-500" />
              Verified Employers
            </div>
          </div>
        </motion.div>

      </div>

      {/* --- FLOATING DECOR --- */}
      <div className="hidden lg:block absolute bottom-10 left-10 animate-bounce transition-all">
        <div className="p-4 bg-white border border-slate-100 shadow-xl rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Over 10K active members</p>
            <p className="text-[10px] font-bold text-indigo-500 uppercase">Trusted Platform</p>
          </div>
        </div>
      </div>
    </main>
  );
}