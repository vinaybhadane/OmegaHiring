"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Calendar, GraduationCap, Briefcase, 
  QrCode, ClipboardCheck, AlertCircle, CheckCircle2, 
  ChevronRight, Upload, MapPin, Send, Loader2, ShieldCheck
} from "lucide-react";

// --- Firebase Imports ---
import { auth, db } from "@/firebase/config"; 
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const jobRoles = [
  "Data Entry (Excel)", "Content Typing", "Form Filling", 
  "Copy Paste Work", "Online Survey", "Captcha Entry",
  "Content Writing", "Video Editing", "Image Editing", "Virtual Assistant"
];

export default function Dashboard() {
  const router = useRouter();
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<any>(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(!auth.currentUser);

  // Form States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    qualification: "",
    utr: "",
  });
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔐 1. AUTH GUARD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); 
      } else {
        setCurrentUser(user);
        setFormData(prev => ({ ...prev, email: user.email || "" }));
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const calculateAge = (date: string) => {
    const birthDate = new Date(date);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
        calculatedAge--;
    }
    setAge(calculatedAge > 0 ? calculatedAge : 0);
  };

  const handleRoleChange = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      if (roles.length < 2) {
        setRoles([...roles, role]);
      } else {
        alert("You can select a maximum of 2 job roles per application.");
      }
    }
  };

  // 🎯 2. DATABASE SUBMISSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roles.length === 0) {
        alert("Please select at least one job role.");
        return;
    }
    setIsSubmitting(true);
    try {
      const applicationData = {
        userId: currentUser.uid,
        ...formData,
        dateOfBirth: dob,
        calculatedAge: age,
        appliedRoles: roles,
        status: "Pending",
        submittedAt: serverTimestamp(),
      };
      await addDoc(collection(db, "hiring_applications"), applicationData);

      // Trigger automatic welcome email
      try {
        await fetch("/api/send-mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: formData.email,
            toName: formData.fullName,
            subject: "Application Submitted Successfully - Omega Hiring",
            text: "Dear Applicant,\n\nThank you for your interest. You have successfully submitted your application. Our team will verify your profile and get back to you with a confirmation shortly.\n\nBest Regards,\nOmega Hiring Team",
            html: "<div style='font-family: sans-serif; padding: 20px; color: #333;'><h2>Application Received</h2><p>Dear Applicant,</p><p>Thank you for your interest in joining our team. We are writing to let you know that you have <strong>successfully submitted your application</strong>.</p><p>Our hiring team will carefully verify your profile and the details you have provided. We will get back to you with a confirmation and the next steps shortly.</p><br/><p>Best Regards,<br/><strong>Omega Hiring Team</strong></p></div>"
          }),
        });
      } catch (mailError) {
        console.error("Failed to send welcome email:", mailError);
      }

      router.push("/success");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 px-4 md:pt-36 md:pb-24">
      <div className="max-w-3xl mx-auto">
        
        {/* --- FORM HEADER --- */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
            Official Hiring Portal
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Application <span className="text-indigo-600">Form</span>
          </h1>
          <p className="text-slate-500 mt-3 text-sm md:text-lg italic">Verified Session: <span className="font-bold text-indigo-600">{currentUser?.email}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          
          {/* SECTION 1: Personal Details */}
          <div className="bg-white p-5 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-slate-800 mb-6 md:mb-8">
              <div className="p-1.5 bg-indigo-50 rounded-lg"><User className="text-indigo-600" size={18} /></div>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={18} />
                <input type="text" placeholder="Full Name" required 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl border border-slate-200 outline-none bg-slate-50/50 placeholder:text-black/40 font-bold text-black text-sm md:text-base" />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                <input type="email" value={formData.email} readOnly 
                  className="w-full pl-11 pr-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 font-bold text-slate-600 text-sm outline-none" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                <input type="tel" placeholder="WhatsApp Number" required 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl border border-slate-200 outline-none bg-slate-50/50 placeholder:text-black/40 font-bold text-black text-sm md:text-base" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                <input type="text" placeholder="City / State" required 
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl border border-slate-200 outline-none bg-slate-50/50 placeholder:text-black/40 font-bold text-black text-sm md:text-base" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Academic & Age */}
          <div className="bg-white p-5 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-slate-800 mb-6 md:mb-8">
              <div className="p-1.5 bg-indigo-50 rounded-lg"><GraduationCap className="text-indigo-600" size={18} /></div>
              Academic & Eligibility
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1.5 block">Date of Birth</label>
                <input type="date" required onChange={(e) => { setDob(e.target.value); calculateAge(e.target.value); }} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none font-bold text-black text-sm" />
              </div>
              <div>
                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1.5 block">Your Age</label>
                <input type="number" value={age || ""} placeholder="Auto" readOnly className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 font-black text-indigo-700 outline-none text-sm" />
              </div>
              <div>
                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1.5 block">Qualification</label>
                <select required onChange={(e) => setFormData({...formData, qualification: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none font-bold text-black text-sm appearance-none">
                  <option value="">Select</option>
                  <option>10th Pass</option>
                  <option>12th Pass</option>
                  <option>Diploma / Graduate</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: Job Selection */}
          <div className="bg-white p-5 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-end mb-6">
                <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-slate-800">
                  <div className="p-1.5 bg-indigo-50 rounded-lg"><Briefcase className="text-indigo-600" size={18} /></div>
                  Job Roles
                </h2>
                <span className="text-[10px] md:text-sm font-bold bg-indigo-600 text-white px-4 py-1.5 rounded-full">
                {roles.length} / 2 Selected
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jobRoles.map((role) => (
                <div key={role} onClick={() => handleRoleChange(role)} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${roles.includes(role) ? "border-indigo-600 bg-indigo-50/30" : "border-slate-100 bg-slate-50/30"}`}>
                  <span className={`text-sm font-bold ${roles.includes(role) ? "text-indigo-700" : "text-black"}`}>{role}</span>
                  {roles.includes(role) && <CheckCircle2 size={16} className="text-indigo-600" />}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: Payment Panel */}
          <div className="rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
            {/* Trust Note */}
            <div className="bg-blue-50 border-b border-blue-100 px-6 py-4 flex items-start gap-3">
              <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 leading-relaxed">
                <span className="font-bold">Why is there a processing fee?</span> To maintain a serious and efficient hiring process, we charge a small application processing fee. Due to the high volume of hiring requests we receive, this helps us prioritize genuine and committed applicants only.
              </p>
            </div>

            <div className="bg-slate-900 p-6 md:p-10 text-white">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs font-bold text-white/80 uppercase tracking-wide">
                    <ShieldCheck size={12} /> Secure Payment Gateway
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold leading-tight text-white" style={{ color: '#ffffff' }}>Application Processing Fee: ₹50</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">This one-time fee covers verification of your application and connects you with our hiring team. Pay securely below.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://upi.pe/contestfees@nyes/50.00?pn=Registration+Fees"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg"
                    >
                      Pay Securely ₹50 <ChevronRight size={16} />
                    </a>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <AlertCircle size={14} className="text-amber-400" />
                      Non-refundable · See Refund Policy
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-xl">
                  <img src="/QR.png" alt="UPI QR Code for ₹50 payment" className="w-36 h-36 md:w-44 md:h-44 object-contain" />
                  <p className="text-center text-xs text-slate-500 font-semibold mt-2">Scan & Pay via UPI</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Submission */}
          <div className="bg-white p-5 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 block">Transaction ID (UTR)</label>
                <div className="relative">
                    <ClipboardCheck className="absolute left-4 top-4 text-slate-400" size={18} />
                    <input type="text" required placeholder="12 Digit UTR" 
                      onChange={(e) => setFormData({...formData, utr: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50/50 placeholder:text-black/40 font-bold text-black text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 block">Payment Proof</label>
                <div className="relative">
                  <Upload className="absolute left-4 top-4 text-slate-400" size={18} />
                  <input type="file" required className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-black file:hidden cursor-pointer" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300">
              {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Submit Application</>}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}