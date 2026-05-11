"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, LogOut, LayoutDashboard, ChevronDown, UserCircle, Menu, X, ShieldCheck } from "lucide-react";
import { auth } from "@/firebase/config";
import { loginWithGoogle } from "@/firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Jobs", href: "/dashboard" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-3"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
      role="banner"
    >
      <div className="container-lg flex items-center justify-between">

        {/* ── BRAND ─────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="OmegaHiring Home">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <Briefcase size={16} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            Omega<span className="text-indigo-600">Hiring</span>
          </span>
        </Link>

        {/* ── DESKTOP NAV ───────────────────────── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── AUTH ──────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3 relative">

          {/* trust indicator */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mr-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secure
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 bg-white hover:shadow-md transition-all"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 overflow-hidden border-2 border-white shadow-sm">
                  {user.photoURL
                    ? <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                    : <User className="p-1.5 text-white w-full h-full" />
                  }
                </div>
                <span className="text-sm font-semibold text-slate-700 max-w-[100px] truncate">
                  {user.displayName?.split(" ")[0]}
                </span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-50"
                    >
                      <div className="px-3 py-2 mb-1 border-b border-slate-50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || "User"}</p>
                      </div>
                      <button onClick={() => { router.push("/dashboard"); setDropdownOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <LayoutDashboard size={15} /> Apply for Jobs
                      </button>
                      <button onClick={() => { router.push("/profile"); setDropdownOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <UserCircle size={15} /> My Applications
                      </button>
                      <div className="my-1 border-t border-slate-50" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                        <LogOut size={15} /> Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="btn-primary text-sm px-5 py-2.5"
              id="navbar-signin"
            >
              Sign In Free
            </button>
          )}
        </div>

        {/* ── MOBILE TOGGLE ─────────────────────── */}
        <button
          className="md:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── MOBILE MENU ──────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container-lg py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2 border-t border-slate-50 mt-1">
                {user ? (
                  <>
                    <button onClick={() => { router.push("/profile"); setMobileOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-indigo-50 rounded-xl flex items-center gap-2 transition-all">
                      <UserCircle size={15} className="text-indigo-500" /> My Applications
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-all">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { loginWithGoogle(); setMobileOpen(false); }}
                    className="w-full btn-primary text-sm mt-2"
                  >
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}