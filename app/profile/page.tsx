"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Calendar, Briefcase, Clock, 
  CheckCircle2, XCircle, AlertCircle, Loader2, 
  MapPin, ExternalLink, ArrowRight, Rocket, Share2, Copy, Send, MessageCircle
} from "lucide-react";

// --- Firebase Imports ---
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // 📝 Official Sharing Message with your Vercel URL
  const shareMessage = `🚀 I just applied at CareerMitra! 

I found a verified platform for genuine Remote Tasks like Data Entry and Content Writing. 

✅ Daily Payouts
✅ 100% Verified Work
✅ Remote Opportunities

Apply here to start your career journey: 
👉 https://CareerMitra.vercel.app`;

  // 🔐 AUTH GUARD & REDIRECT
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
        await fetchApplications(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchApplications = async (userId: string) => {
    try {
      const q = query(
        collection(db, "hiring_applications"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const apps = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const configs: any = {
      Pending: { color: "bg-amber-50 text-amber-600 border-amber-100", icon: <Clock size={14} /> },
      Selected: { color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: <CheckCircle2 size={14} /> },
      Rejected: { color: "bg-rose-50 text-rose-600 border-rose-100", icon: <XCircle size={14} /> },
    };
    const config = configs[status] || configs.Pending;
    return (
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.color} text-[10px] font-black uppercase tracking-widest shadow-sm`}>
        {config.icon} {status}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Authenticating...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-16 px-4 md:pt-36">
      <div className="max-w-4xl mx-auto">
        
        {/* --- 1. PROFILE OVERVIEW --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6 relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-indigo-600 border-4 border-white shadow-2xl overflow-hidden">
                <img src={user?.photoURL || "/default-avatar.png"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">
                {user?.displayName}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full text-slate-500 text-xs font-bold border border-slate-100">
                  <Mail size={14} className="text-indigo-500" /> {user?.email}
                </span>
                <span className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full text-indigo-600 text-xs font-bold border border-indigo-100">
                  <Briefcase size={14} /> {applications.length} Applications
                </span>
              </div>
            </div>

            <button 
              onClick={() => router.push("/dashboard")}
              className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
            >
              New Application <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-60" />
        </motion.div>

        {/* --- 2. PROFILE BOOSTER (REFERRAL) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-indigo-600 rounded-[2.5rem] p-6 md:p-10 text-white mb-10 relative overflow-hidden shadow-2xl shadow-indigo-200"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg"><Rocket className="text-white" size={24} /></div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Boost Your Selection Chance</h2>
            </div>
            <p className="text-indigo-100 text-sm md:text-base mb-8 max-w-xl leading-relaxed">
              Refer your friends to increase your visibility. When your friends successfully register, your profile gets a <span className="text-white font-bold underline">PRIORITY BOOST</span> in our recruitment system.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a 
                href={`https://t.me/share/url?url=https://CareerMitra.vercel.app&text=${encodeURIComponent(shareMessage)}`}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#0088cc] py-3.5 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg"
              >
                <Send size={18} /> Telegram
              </a>
              <button 
                onClick={copyLink}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all border-2 ${copied ? 'bg-white text-indigo-600 border-white shadow-xl' : 'bg-transparent border-white/30 hover:bg-white/10'}`}
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                {copied ? "Link Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mb-32 blur-3xl" />
        </motion.div>

        {/* --- 3. APPLICATION HISTORY --- */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 px-2">
            <div className="w-2 h-7 bg-indigo-600 rounded-full" /> 
            Application History
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {applications.length > 0 ? (
              <AnimatePresence>
                {applications.map((app, index) => (
                  <motion.div 
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-indigo-200 transition-all"
                  >
                    <div className="flex items-center gap-4 w-full md:w-auto text-left">
                      <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-800 text-lg uppercase leading-tight tracking-tight">
                          {app.appliedRoles?.join(" & ")}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-[10px] md:text-xs font-bold text-slate-400">
                           <span className="flex items-center gap-1"><MapPin size={12} /> {app.city || "Remote"}</span>
                           <span className="opacity-60 italic">Ref: {app.id.slice(0,8)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Application Status</span>
                        <StatusBadge status={app.status || "Pending"} />
                      </div>
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="bg-white py-20 rounded-[2.5rem] border-2 border-dashed border-slate-100 text-center px-6">
                <AlertCircle size={40} className="text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-900 uppercase">No Records</h3>
                <p className="text-slate-400 text-sm mt-2 mb-8 font-medium">You haven't applied for any positions yet.</p>
                <button 
                  onClick={() => router.push("/dashboard")}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
                >
                  Apply Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}