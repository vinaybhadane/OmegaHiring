"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Loader2, Mail, ShieldAlert, User, Phone } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "vinaybhadane06@gmail.com") {
        setIsAdmin(true);
        fetchApplications();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchApplications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "hiring_applications"));
      const apps: any[] = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() });
      });
      // Sort by submittedAt desc
      apps.sort((a, b) => (b.submittedAt?.toMillis() || 0) - (a.submittedAt?.toMillis() || 0));
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendManualEmail = async (appId: string, email: string, name: string) => {
    if (!confirm(`Send update email to ${email}?`)) return;
    
    setSendingEmailId(appId);
    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: email,
          toName: name,
          subject: "Important Update on Your Job Application - Omega Hiring",
          text: "Dear Applicant,\n\nWe are reaching out to provide an update on your recent job application. Our team has reviewed your profile, and we will be moving forward with the next steps of the selection process.\n\nPlease keep an eye on your inbox for further instructions.\n\nBest Regards,\nOmega Hiring Team",
          html: "<div style='font-family: sans-serif; padding: 20px; color: #333;'><h2>Application Update</h2><p>Dear Applicant,</p><p>We are reaching out to provide an update on your recent job application with Omega Hiring.</p><p>Our team has reviewed your profile, and we will be moving forward with the next steps of the selection process. Please keep an eye on your inbox for further instructions.</p><br/><p>Best Regards,<br/><strong>Omega Hiring Team</strong></p></div>"
        }),
      });

      if (res.ok) {
        alert("Email sent successfully!");
      } else {
        const errorData = await res.json();
        alert(`Failed to send email: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Email error:", error);
      alert("Error sending email.");
    } finally {
      setSendingEmailId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <ShieldAlert size={64} className="text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Access Denied</h1>
        <p className="text-slate-500 text-center">You do not have permission to view this page. This page is restricted to administrators only.</p>
        <button onClick={() => router.push("/")} className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 px-4 md:pt-36 md:pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Admin Portal
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Applications <span className="text-indigo-600">Dashboard</span>
            </h1>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 font-bold text-slate-600 flex items-center gap-2">
            <User size={18} className="text-indigo-600" />
            Admin: vinaybhadane06@gmail.com
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Applicant Info</th>
                  <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Roles Applied</th>
                  <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Status</th>
                  <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-slate-500 font-medium">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5">
                        <div className="font-bold text-slate-800 text-base mb-1">{app.fullName || "N/A"}</div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                          <Mail size={14} /> {app.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Phone size={14} /> {app.phone || "N/A"}
                        </div>
                      </td>
                      <td className="p-5 align-top">
                        <div className="flex flex-wrap gap-2">
                          {app.appliedRoles?.map((role: string, idx: number) => (
                            <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold">
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-5 align-top">
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-lg text-xs font-bold border border-amber-100">
                          <Loader2 size={12} className="animate-spin" /> {app.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-5 align-top text-right">
                        <button
                          onClick={() => handleSendManualEmail(app.id, app.email, app.fullName)}
                          disabled={sendingEmailId === app.id}
                          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:bg-slate-300 disabled:cursor-not-allowed w-full sm:w-auto"
                        >
                          {sendingEmailId === app.id ? (
                            <><Loader2 size={16} className="animate-spin" /> Sending...</>
                          ) : (
                            <><Mail size={16} /> Send Email</>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
