"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, LogOut, LayoutDashboard, ChevronDown, UserCircle } from "lucide-react";

// --- SAHI IMPORTS ---
import { auth } from "@/firebase/config"; 
import { loginWithGoogle } from "@/firebase/auth"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${
        isScrolled ? "py-3 border-b border-slate-100 shadow-sm" : "py-6 border-b border-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* BRAND */}
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer group">
          <Sparkles className="w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform" />
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Omega<span className="text-indigo-600">Hiring</span>.
          </h1>
        </div>

        {/* AUTH */}
        <div className="relative">
          {user ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 overflow-hidden border-2 border-white shadow-sm">
                  {user.photoURL ? <img src={user.photoURL} alt="pfp" className="w-full h-full object-cover" /> : <User className="p-1 text-white" />}
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-2 z-10 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 mb-1 border-b border-slate-50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || "User"}</p>
                      </div>

                      {/* 1. Hiring Form (Dashboard) */}
                      <button 
                        onClick={() => { router.push("/dashboard"); setDropdownOpen(false); }} 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all"
                      >
                        <LayoutDashboard size={16} /> Hiring Form
                      </button>

                      {/* 2. My Profile */}
                      <button 
                        onClick={() => { router.push("/profile"); setDropdownOpen(false); }} 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all"
                      >
                        <UserCircle size={16} /> My Profile
                      </button>

                      {/* Divider */}
                      <div className="my-1 border-t border-slate-50" />

                      {/* 3. Logout */}
                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle} 
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 shadow-lg shadow-slate-200 hover:shadow-indigo-100 transition-all duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}