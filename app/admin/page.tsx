"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, updateDoc, doc, setDoc } from "firebase/firestore";
import { 
  Loader2, Mail, ShieldAlert, User, Phone, CheckSquare, 
  Square, Search, Send, RefreshCw, Layers, CheckCircle2, 
  XCircle, Clock, ChevronRight, AlertTriangle, AlertCircle, Play, Pause,
  Check, Eye, Trash2, Calendar, MapPin
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [users, setUsers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'applications' | 'campaign'>('users');
  
  // Selection & Search States
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [userSearch, setUserSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [userFilter, setUserFilter] = useState<'all' | 'applied' | 'registered_only'>('all');
  const [appFilter, setAppFilter] = useState<'all' | 'Pending' | 'Approved' | 'Rejected'>('all');

  // Individual Email states
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  // Import Users States
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState({ current: 0, total: 0 });

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        
        if (!parsed.users || !Array.isArray(parsed.users)) {
          alert("Invalid users.json format. Make sure it contains a 'users' array.");
          return;
        }

        const list = parsed.users;
        if (!confirm(`Import ${list.length} users to Firestore? This will sync them so they show up on this admin page.`)) {
          return;
        }

        setImporting(true);
        setImportProgress({ current: 0, total: list.length });

        for (let i = 0; i < list.length; i++) {
          const u = list[i];
          const uid = u.localId || u.uid;
          
          if (!uid || !u.email) continue;

          // Parse sign-in date
          const lastLoginDate = u.lastSignedInAt ? new Date(parseInt(u.lastSignedInAt)) : new Date();

          await setDoc(doc(db, "users", uid), {
            uid: uid,
            email: u.email,
            displayName: u.displayName || u.fullName || "Google User",
            photoURL: u.photoUrl || null,
            lastLogin: lastLoginDate,
          }, { merge: true });

          setImportProgress({ current: i + 1, total: list.length });
          
          // Throttled pause every 15 items to not overload Firestore connection on large imports
          if (i % 15 === 0) {
            await new Promise(resolve => setTimeout(resolve, 30));
          }
        }

        alert("All users successfully imported and synced to Firestore!");
        fetchAllData();
      } catch (err: any) {
        console.error("Import error:", err);
        alert(`Error parsing file: ${err.message}`);
      } finally {
        setImporting(false);
        setImportProgress({ current: 0, total: 0 });
      }
    };
    reader.readAsText(file);
  };

  // Campaign States
  const [campaignSubject, setCampaignSubject] = useState("Regarding your registration at careers.abhyasmitra.in");
  
  const initialEnglishHtml = `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333333; max-width: 600px;">
  <p>Hello {NAME},</p>
  
  <p>Thank you for registering on our careers portal (careers.abhyasmitra.in).</p>
  
  <p>Please complete your application profile on the dashboard to proceed:<br/>
  <a href="https://careers.abhyasmitra.in/dashboard" style="color: #0056b3; text-decoration: underline;">https://careers.abhyasmitra.in/dashboard</a></p>
  
  <p>For official updates, announcements, and job alerts, please join our WhatsApp channel:<br/>
  <a href="https://whatsapp.com/channel/0029VbCqdnmIyPtVjKk6gQ0m" style="color: #0056b3; text-decoration: underline;">https://whatsapp.com/channel/0029VbCqdnmIyPtVjKk6gQ0m</a></p>
  
  <p>If you have already paid the fee and completed your application, please ignore this email.</p>
  
  <p>Best regards,<br/>
  Omega Hiring Team<br/>
  careers@abhyasmitra.in</p>
</div>`;

  const initialEnglishText = `Hello {NAME},\n\nThank you for registering on our careers portal (careers.abhyasmitra.in).\n\nPlease complete your application profile on the dashboard to proceed:\nhttps://careers.abhyasmitra.in/dashboard\n\nFor official updates, announcements, and job alerts, please join our WhatsApp channel:\nhttps://whatsapp.com/channel/0029VbCqdnmIyPtVjKk6gQ0m\n\nIf you have already paid the fee and completed your application, please ignore this email.\n\nBest regards,\nOmega Hiring Team\ncareers@abhyasmitra.in`;

  const [campaignHtml, setCampaignHtml] = useState(initialEnglishHtml);
  const [campaignText, setCampaignText] = useState(initialEnglishText);

  // Campaign Progress States
  const [sendingIndex, setSendingIndex] = useState(-1);
  const [campaignStatus, setCampaignStatus] = useState<'idle' | 'sending' | 'paused' | 'completed'>('idle');
  const [sentCount, setSentCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [campaignLogs, setCampaignLogs] = useState<any[]>([]);
  const stopCampaignRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "vinaybhadane06@gmail.com") {
        setIsAdmin(true);
        fetchAllData();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch from users collection
      const usersSnapshot = await getDocs(collection(db, "users"));
      const dbUsers: any[] = [];
      usersSnapshot.forEach((doc) => {
        dbUsers.push({ id: doc.id, ...doc.data() });
      });
      
      // 2. Fetch from hiring_applications collection
      const appsSnapshot = await getDocs(collection(db, "hiring_applications"));
      const apps: any[] = [];
      appsSnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() });
      });
      
      // 3. Merge users from both tables to ensure no registrations are missed
      const emailToUserMap = new Map<string, any>();
      
      dbUsers.forEach((u) => {
        if (u.email) {
          emailToUserMap.set(u.email.toLowerCase(), {
            uid: u.uid || u.id,
            email: u.email,
            displayName: u.displayName || u.fullName || "User",
            lastLogin: u.lastLogin?.toDate() || null,
            applied: false,
            applicationStatus: null,
            applications: []
          });
        }
      });
      
      apps.forEach((app) => {
        if (app.email) {
          const emailKey = app.email.toLowerCase();
          const existing = emailToUserMap.get(emailKey);
          
          if (existing) {
            existing.applied = true;
            existing.applicationStatus = app.status || "Pending";
            existing.applications.push(app);
            if (app.fullName && (!existing.displayName || existing.displayName === "User")) {
              existing.displayName = app.fullName;
            }
          } else {
            emailToUserMap.set(emailKey, {
              uid: app.userId || app.id,
              email: app.email,
              displayName: app.fullName || "User",
              lastLogin: null,
              applied: true,
              applicationStatus: app.status || "Pending",
              applications: [app]
            });
          }
        }
      });
      
      const mergedList = Array.from(emailToUserMap.values());
      // Sort: Applied first, then by display name
      mergedList.sort((a, b) => {
        if (a.applied && !b.applied) return -1;
        if (!a.applied && b.applied) return 1;
        return a.displayName.localeCompare(b.displayName);
      });
      
      setUsers(mergedList);
      
      // Sort applications by submittedAt desc
      apps.sort((a, b) => (b.submittedAt?.toMillis() || 0) - (a.submittedAt?.toMillis() || 0));
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: string) => {
    if (!confirm(`Update status of application to ${newStatus}?`)) return;
    
    try {
      await updateDoc(doc(db, "hiring_applications", appId), {
        status: newStatus
      });
      alert("Application status updated!");
      fetchAllData();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
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
          text: `Dear ${name},\n\nWe are reaching out to provide an update on your recent job application. Our team will review your application soon, and we will be moving forward with the next steps of the selection process.\n\nPlease keep an eye on your inbox for further instructions.\n\nBest Regards,\nOmega Hiring Team`,
          html: `<div style='font-family: sans-serif; padding: 20px; color: #333;'><h2>Application Update</h2><p>Dear ${name},</p><p>We are reaching out to provide an update on your recent job application with Omega Hiring.</p><p>Our team will review your application soon, and we will be moving forward with the next steps of the selection process. Please keep an eye on your inbox for further instructions.</p><br/><p>Best Regards,<br/><strong>Omega Hiring Team</strong></p></div>`,
          fromEmail: "careers@abhyasmitra.in"
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

  // Selection helpers
  const handleToggleSelectAll = (filteredUsers: any[]) => {
    const allEmailsInFiltered = filteredUsers.map(u => u.email);
    const someUnselected = allEmailsInFiltered.some(email => !selectedEmails.has(email));
    
    const newSelected = new Set(selectedEmails);
    if (someUnselected) {
      allEmailsInFiltered.forEach(email => newSelected.add(email));
    } else {
      allEmailsInFiltered.forEach(email => newSelected.delete(email));
    }
    setSelectedEmails(newSelected);
  };

  const handleToggleSelectUser = (email: string) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(email)) {
      newSelected.delete(email);
    } else {
      newSelected.add(email);
    }
    setSelectedEmails(newSelected);
  };

  // Filter lists
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.displayName.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase());
    if (!matchesSearch) return false;
    
    if (userFilter === 'applied') return u.applied;
    if (userFilter === 'registered_only') return !u.applied;
    return true;
  });

  const filteredApps = applications.filter((app) => {
    const matchesSearch = (app.fullName || "").toLowerCase().includes(appSearch.toLowerCase()) || 
                          (app.email || "").toLowerCase().includes(appSearch.toLowerCase()) ||
                          (app.utr || "").toLowerCase().includes(appSearch.toLowerCase());
    if (!matchesSearch) return false;

    if (appFilter !== 'all') return app.status === appFilter;
    return true;
  });

  const selectedUsersList = users.filter(u => selectedEmails.has(u.email));

  // Bulk Email Campaign Logic
  const startCampaign = async () => {
    if (selectedUsersList.length === 0) return;
    
    setCampaignStatus('sending');
    stopCampaignRef.current = false;
    
    let currentSent = sentCount;
    let currentFail = failCount;
    
    // Resume from index or start fresh
    const startIndex = sendingIndex === -1 || sendingIndex === selectedUsersList.length - 1 ? 0 : sendingIndex + 1;
    
    if (startIndex === 0) {
      setSentCount(0);
      setFailCount(0);
      setCampaignLogs([]);
      currentSent = 0;
      currentFail = 0;
    }
    
    for (let i = startIndex; i < selectedUsersList.length; i++) {
      if (stopCampaignRef.current) {
        setCampaignStatus('paused');
        break;
      }
      
      setSendingIndex(i);
      const recipient = selectedUsersList[i];
      
      const personalizedHtml = campaignHtml.replace(/{NAME}/g, recipient.displayName);
      const personalizedText = campaignText.replace(/{NAME}/g, recipient.displayName);
      
      try {
        const res = await fetch("/api/send-mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: recipient.email,
            toName: recipient.displayName,
            subject: campaignSubject,
            text: personalizedText,
            html: personalizedHtml,
            fromEmail: "careers@abhyasmitra.in",
            fromName: "Omega Hiring"
          })
        });
        
        if (res.ok) {
          currentSent++;
          setSentCount(currentSent);
          setCampaignLogs(prev => [
            { email: recipient.email, name: recipient.displayName, status: 'success', message: 'Sent successfully' },
            ...prev
          ]);
        } else {
          const errorData = await res.json();
          currentFail++;
          setFailCount(currentFail);
          setCampaignLogs(prev => [
            { email: recipient.email, name: recipient.displayName, status: 'error', message: errorData.error || 'Failed to send' },
            ...prev
          ]);
        }
      } catch (error: any) {
        currentFail++;
        setFailCount(currentFail);
        setCampaignLogs(prev => [
          { email: recipient.email, name: recipient.displayName, status: 'error', message: error.message || 'Network error' },
          ...prev
        ]);
      }
      
      // Throttle delay of 350ms to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 350));
    }
    
    if (!stopCampaignRef.current) {
      setCampaignStatus('completed');
    }
  };

  const pauseCampaign = () => {
    stopCampaignRef.current = true;
    setCampaignStatus('paused');
  };

  const resetCampaign = () => {
    stopCampaignRef.current = true;
    setCampaignStatus('idle');
    setSendingIndex(-1);
    setSentCount(0);
    setFailCount(0);
    setCampaignLogs([]);
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

  const allSelected = filteredUsers.length > 0 && filteredUsers.every(u => selectedEmails.has(u.email));
  const someSelected = filteredUsers.some(u => selectedEmails.has(u.email)) && !allSelected;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 pb-16 px-4 md:pt-36 md:pb-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Admin Portal
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Management <span className="text-indigo-600">Console</span>
            </h1>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 font-bold text-slate-600 flex items-center gap-2">
            <User size={18} className="text-indigo-600" />
            vinaybhadane06@gmail.com
            <button onClick={fetchAllData} className="ml-2 p-1.5 bg-slate-50 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-all" title="Refresh Database">
              <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 p-1 bg-slate-200/60 rounded-xl mb-8 w-fit">
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <User size={16} /> Registered Users ({users.length})
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'applications' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <Layers size={16} /> Applications ({applications.length})
          </button>
          <button 
            onClick={() => setActiveTab('campaign')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all relative ${activeTab === 'campaign' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <Send size={16} /> Bulk Email Campaign
            {selectedEmails.size > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#F8FAFC]">
                {selectedEmails.size}
              </span>
            )}
          </button>
        </div>

        {/* Active Tab Screen */}
        <AnimatePresence mode="wait">
          {activeTab === 'users' && (
            <motion.div 
              key="users-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {/* Sync existing Firebase Auth Users Card */}
              <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-[2rem] flex flex-col md:flex-row gap-5 items-center justify-between shadow-sm">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="font-bold text-indigo-900 text-sm md:text-base">Sync Firebase Authentication Users</h4>
                  <p className="text-xs text-indigo-700 max-w-2xl leading-relaxed">
                    Firebase client SDK security rules restrict listing all auth accounts. To view and email all {importing ? `(${importProgress.total})` : '580+'} registered accounts, export them using <code className="bg-indigo-100/80 px-1.5 py-0.5 rounded font-mono text-[10px] text-indigo-800">firebase auth:export users.json --format=json</code>, then upload it below.
                  </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  {importing ? (
                    <div className="flex flex-col items-center md:items-end gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-indigo-800 font-bold">
                        <Loader2 className="animate-spin text-indigo-600" size={14} />
                        Syncing {importProgress.current} / {importProgress.total}
                      </div>
                      <div className="w-40 h-2 bg-indigo-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 transition-all duration-200" style={{ width: `${(importProgress.current / importProgress.total) * 100}%` }} />
                      </div>
                    </div>
                  ) : (
                    <label className="relative cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm text-center">
                      <Layers size={14} />
                      <span>Upload users.json</span>
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={handleImportJson} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Users Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search users by name or email..." 
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm bg-slate-50/50"
                  />
                </div>
                <div className="flex gap-3 w-full md:w-auto shrink-0 justify-end">
                  <select 
                    value={userFilter} 
                    onChange={(e: any) => setUserFilter(e.target.value)}
                    className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none"
                  >
                    <option value="all">All Registrations</option>
                    <option value="applied">Applied Only</option>
                    <option value="registered_only">Registered But Not Applied</option>
                  </select>
                  
                  {selectedEmails.size > 0 && (
                    <button 
                      onClick={() => setActiveTab('campaign')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 shadow-sm"
                    >
                      <Send size={15} /> Campaign for {selectedEmails.size} Selected
                    </button>
                  )}
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="p-5 w-12 text-center">
                          <button 
                            onClick={() => handleToggleSelectAll(filteredUsers)}
                            className="p-1 rounded hover:bg-slate-200 text-indigo-600 transition-colors"
                          >
                            {allSelected ? <CheckSquare size={18} /> : someSelected ? <AlertSquare size={18} className="text-indigo-400" /> : <Square size={18} className="text-slate-400" />}
                          </button>
                        </th>
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">User Profile</th>
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Session Info</th>
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Application Status</th>
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-10 text-center text-slate-500 font-medium">
                            No registered users matching filters.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => {
                          const isSelected = selectedEmails.has(u.email);
                          return (
                            <tr key={u.email} className={`hover:bg-slate-50/50 transition-colors ${isSelected ? 'bg-indigo-50/10' : ''}`}>
                              <td className="p-5 text-center">
                                <button 
                                  onClick={() => handleToggleSelectUser(u.email)}
                                  className="p-1 rounded text-indigo-600 hover:bg-slate-100 transition-colors"
                                >
                                  {isSelected ? <CheckSquare size={18} /> : <Square size={18} className="text-slate-300" />}
                                </button>
                              </td>
                              <td className="p-5">
                                <div className="font-bold text-slate-800 text-base mb-0.5">{u.displayName}</div>
                                <div className="text-sm text-slate-500 flex items-center gap-1.5">
                                  <Mail size={13} className="text-slate-400" /> {u.email}
                                </div>
                              </td>
                              <td className="p-5">
                                {u.lastLogin ? (
                                  <span className="text-xs text-slate-500 font-medium">
                                    Last login: {u.lastLogin.toLocaleDateString()} {u.lastLogin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400 italic">No login log (Application import)</span>
                                )}
                              </td>
                              <td className="p-5">
                                {u.applied ? (
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${
                                    u.applicationStatus === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    u.applicationStatus === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                    'bg-amber-50 text-amber-600 border-amber-100'
                                  }`}>
                                    {u.applicationStatus === 'Approved' && <CheckCircle2 size={12} />}
                                    {u.applicationStatus === 'Rejected' && <XCircle size={12} />}
                                    {(!u.applicationStatus || u.applicationStatus === 'Pending') && <Clock size={12} className="animate-pulse" />}
                                    {u.applicationStatus || "Pending"}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold border border-slate-200">
                                    <AlertCircle size={12} /> Registered Only
                                  </span>
                                )}
                              </td>
                              <td className="p-5 text-right">
                                {u.applied && u.applications.length > 0 ? (
                                  <button 
                                    onClick={() => {
                                      setAppSearch(u.email);
                                      setActiveTab('applications');
                                    }}
                                    className="text-indigo-600 hover:text-indigo-700 font-bold text-xs bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                                  >
                                    View Application <ChevronRight size={12} />
                                  </button>
                                ) : (
                                  <span className="text-xs text-slate-400 italic font-medium">No application data</span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div 
              key="applications-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {/* Applications Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search applications by name, email or UTR..." 
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none text-sm bg-slate-50/50"
                  />
                </div>
                <div className="flex gap-3 shrink-0">
                  <select 
                    value={appFilter} 
                    onChange={(e: any) => setAppFilter(e.target.value)}
                    className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm font-semibold outline-none"
                  >
                    <option value="all">All Application Statuses</option>
                    <option value="Pending">Pending Only</option>
                    <option value="Approved">Approved Only</option>
                    <option value="Rejected">Rejected Only</option>
                  </select>
                </div>
              </div>

              {/* Applications Table */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Applicant Info</th>
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Roles & Details</th>
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Payment / UTR</th>
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Status</th>
                        <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApps.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-10 text-center text-slate-500 font-medium">
                            No job applications found matching filter.
                          </td>
                        </tr>
                      ) : (
                        filteredApps.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-5">
                              <div className="font-bold text-slate-800 text-base mb-1">{app.fullName || "N/A"}</div>
                              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                                <Mail size={14} className="text-slate-400" /> {app.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Phone size={14} className="text-slate-400" /> {app.phone || "N/A"}
                              </div>
                            </td>
                            <td className="p-5 align-top">
                              <div className="flex flex-wrap gap-1.5 mb-2">
                                {app.appliedRoles?.map((role: string, idx: number) => (
                                  <span key={idx} className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-md text-xs font-bold border border-indigo-100">
                                    {role}
                                  </span>
                                ))}
                              </div>
                              <div className="text-xs text-slate-400 space-y-0.5">
                                <div>City: <span className="font-semibold text-slate-600">{app.city || "N/A"}</span></div>
                                <div>Qual: <span className="font-semibold text-slate-600">{app.qualification || "N/A"}</span></div>
                                <div>Age: <span className="font-semibold text-slate-600">{app.calculatedAge || app.dateOfBirth || "N/A"}</span></div>
                              </div>
                            </td>
                            <td className="p-5 align-top">
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-[200px]">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">UTR Number</div>
                                <div className="font-mono text-xs font-black text-slate-700 break-all select-all mt-0.5">{app.utr || "N/A"}</div>
                              </div>
                            </td>
                            <td className="p-5 align-top">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${
                                app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                app.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                'bg-amber-50 text-amber-600 border-amber-100'
                              }`}>
                                {app.status === 'Approved' && <CheckCircle2 size={12} />}
                                {app.status === 'Rejected' && <XCircle size={12} />}
                                {(!app.status || app.status === 'Pending') && <Loader2 size={12} className="animate-spin" />}
                                {app.status || "Pending"}
                              </span>
                            </td>
                            <td className="p-5 align-top text-right space-y-2">
                              <div className="flex gap-2 justify-end">
                                <button 
                                  onClick={() => handleUpdateAppStatus(app.id, 'Approved')}
                                  disabled={app.status === 'Approved'}
                                  className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors disabled:opacity-40"
                                  title="Approve"
                                >
                                  <Check size={16} />
                                </button>
                                <button 
                                  onClick={() => handleUpdateAppStatus(app.id, 'Rejected')}
                                  disabled={app.status === 'Rejected'}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors disabled:opacity-40"
                                  title="Reject"
                                >
                                  <XCircle size={16} />
                                </button>
                              </div>
                              <button
                                onClick={() => handleSendManualEmail(app.id, app.email, app.fullName)}
                                disabled={sendingEmailId === app.id}
                                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all disabled:bg-slate-300 disabled:cursor-not-allowed w-full"
                              >
                                {sendingEmailId === app.id ? (
                                  <><Loader2 size={12} className="animate-spin" /> Sending...</>
                                ) : (
                                  <><Mail size={12} /> Send Update</>
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
            </motion.div>
          )}

          {activeTab === 'campaign' && (
            <motion.div 
              key="campaign-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Campaign Inputs & Control */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Warning if no users selected */}
                {selectedUsersList.length === 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
                    <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-amber-800 text-sm mb-1">No Recipients Selected</h4>
                      <p className="text-xs text-amber-600 leading-relaxed mb-3">
                        Aapne bulk emails send karne keliye kisi bhi user ko select nahi kiya hai. Pehle <strong>Registered Users</strong> tab par jayein aur users select karein.
                      </p>
                      <button 
                        onClick={() => setActiveTab('users')} 
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5"
                      >
                        Go to User Registrations <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Campaign Form */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <Send size={18} className="text-indigo-600" />
                    Campaign Details
                  </h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sender Email Address</label>
                    <input 
                      type="text" 
                      value="careers@abhyasmitra.in (Verified Default)" 
                      readOnly 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold text-sm outline-none cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Subject / Title</label>
                    <input 
                      type="text" 
                      value={campaignSubject}
                      onChange={(e) => setCampaignSubject(e.target.value)}
                      placeholder="Attractive earning title..."
                      disabled={campaignStatus === 'sending'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none font-bold text-slate-800 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">HTML Template Content</label>
                    <textarea 
                      rows={12}
                      value={campaignHtml}
                      onChange={(e) => setCampaignHtml(e.target.value)}
                      disabled={campaignStatus === 'sending'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none font-mono text-xs bg-slate-50/50 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fallback Plain Text Content</label>
                    <textarea 
                      rows={5}
                      value={campaignText}
                      onChange={(e) => setCampaignText(e.target.value)}
                      disabled={campaignStatus === 'sending'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-slate-600 text-sm bg-slate-50/50 leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Campaign Panel Status */}
              <div className="space-y-6">
                
                {/* Summary Card */}
                <div className="bg-slate-900 rounded-[2rem] p-6 text-white space-y-6">
                  <div>
                    <h3 className="font-extrabold text-xl leading-tight">Campaign Status</h3>
                    <p className="text-slate-400 text-xs mt-1">Control and review progress of active bulk mail delivery.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Selected</div>
                      <div className="text-2xl font-black text-white mt-1">{selectedUsersList.length}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Status</div>
                      <div className="text-sm font-bold text-indigo-400 mt-2 capitalize">{campaignStatus}</div>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-emerald-400">
                      <div className="text-[10px] font-bold text-emerald-500/60 uppercase">Sent</div>
                      <div className="text-2xl font-black mt-1">{sentCount}</div>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-400">
                      <div className="text-[10px] font-bold text-rose-500/60 uppercase">Failed</div>
                      <div className="text-2xl font-black mt-1">{failCount}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {selectedUsersList.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Progress</span>
                        <span>{Math.round(((sentCount + failCount) / selectedUsersList.length) * 100)}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-300"
                          style={{ width: `${((sentCount + failCount) / selectedUsersList.length) * 100}%` }}
                        />
                      </div>
                      {sendingIndex >= 0 && sendingIndex < selectedUsersList.length && (
                        <div className="text-[10px] text-slate-400 italic">
                          Processing: {selectedUsersList[sendingIndex].email}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Controls */}
                  {selectedUsersList.length > 0 && (
                    <div className="flex flex-col gap-2 pt-2">
                      {campaignStatus === 'idle' || campaignStatus === 'paused' ? (
                        <button 
                          onClick={startCampaign}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <Play size={16} /> {campaignStatus === 'paused' ? 'Resume Campaign' : 'Start Bulk Mail'}
                        </button>
                      ) : (
                        <button 
                          onClick={pauseCampaign}
                          className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <Pause size={16} /> Pause Campaign
                        </button>
                      )}
                      
                      <button 
                        onClick={resetCampaign}
                        className="w-full border border-white/20 hover:bg-white/5 text-slate-300 py-3 rounded-xl font-semibold text-sm transition-all"
                      >
                        Reset / Cancel Campaign
                      </button>
                    </div>
                  )}
                </div>

                {/* Logs Card */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-800 text-sm">Campaign Logs</h4>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Live</span>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-50 space-y-2.5 pr-2">
                    {campaignLogs.length === 0 ? (
                      <div className="text-center py-10 text-slate-400 text-xs italic">
                        Logs will populate once the campaign starts.
                      </div>
                    ) : (
                      campaignLogs.map((log, index) => (
                        <div key={index} className="pt-2 text-xs flex justify-between items-start gap-2">
                          <div>
                            <div className="font-bold text-slate-700">{log.name || 'User'}</div>
                            <div className="text-[10px] text-slate-400">{log.email}</div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            log.status === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                          }`} title={log.message}>
                            {log.status === 'success' ? 'Sent' : 'Error'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}

// Custom missing icon implementation
function AlertSquare({ size, className }: { size: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 border-2 border-current rounded" />
      <div className="absolute inset-0 flex items-center justify-center font-bold text-xs" style={{ top: -1 }}>-</div>
    </div>
  );
}
