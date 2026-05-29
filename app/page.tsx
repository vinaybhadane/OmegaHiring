"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { loginWithGoogle } from "@/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Briefcase, Star, ArrowRight, Users, Loader2,
  Search, MapPin, Clock, CheckCircle2, Zap, Globe2, Lock,
  TrendingUp, ChevronDown, ChevronUp, Award, Heart, Phone,
  X, BookOpen, IndianRupee, Building2, Wifi, GraduationCap,
  PenLine, Headphones, BarChart2, Camera, Code, FileText,
  ChevronRight, Eye, ThumbsUp, Filter, Flame,
} from "lucide-react";

// ─── JOB DATA ──────────────────────────────────────────────────
const allJobs = [
  {
    id: 1,
    title: "Data Entry Specialist",
    company: "InfoSync Solutions",
    type: "Work From Home",
    pay: "₹8,000–15,000/mo",
    tag: "Fresher OK",
    category: "Data Entry",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tagColor: "bg-blue-50 text-blue-700 border-blue-100",
    openings: 12,
    applicants: 340,
    skills: ["MS Excel", "Typing Speed 30 WPM", "Attention to Detail"],
    experience: "0–1 Year",
    description: "We are looking for accurate and efficient Data Entry Specialists to maintain and update our databases. You will be responsible for entering data from various sources into our computer system and verifying accuracy.",
    responsibilities: [
      "Enter data from source documents into prescribed computer database, files, and forms",
      "Transcribe information into required electronic format",
      "Scan documents and print files, when needed",
      "Keep information confidential and secure",
      "Respond to information requests from authorized team members",
    ],
    perks: ["Work from home", "Flexible hours", "Weekly payout", "Training provided"],
    posted: "2 hours ago",
    urgent: true,
  },
  {
    id: 2,
    title: "Content Writer",
    company: "Wordcraft Media",
    type: "Remote | Part-Time",
    pay: "₹10,000–20,000/mo",
    tag: "Flexible Hours",
    category: "Writing",
    icon: PenLine,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    tagColor: "bg-violet-50 text-violet-700 border-violet-100",
    openings: 8,
    applicants: 210,
    skills: ["English Writing", "SEO Basics", "Research", "Creativity"],
    experience: "0–2 Years",
    description: "Wordcraft Media is seeking talented Content Writers to produce engaging articles, blogs, and web copy for our diverse portfolio of clients. Perfect for students and freelancers looking for flexible remote work.",
    responsibilities: [
      "Research industry-related topics and produce high-quality content",
      "Write clear, attractive copy with a distinct voice",
      "Optimize content using SEO best practices",
      "Proofread and edit articles before delivery",
      "Meet deadlines consistently and communicate progress",
    ],
    perks: ["Part-time friendly", "Work anytime", "Per-article payment", "Portfolio building"],
    posted: "5 hours ago",
    urgent: false,
  },
  {
    id: 3,
    title: "Virtual Assistant",
    company: "RemoteOps India",
    type: "Work From Home",
    pay: "₹12,000–18,000/mo",
    tag: "Student Friendly",
    category: "Admin",
    icon: Headphones,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    openings: 15,
    applicants: 480,
    skills: ["Communication", "Email Management", "MS Office", "Time Management"],
    experience: "0–1 Year",
    description: "Join RemoteOps India as a Virtual Assistant and support our clients with administrative tasks, scheduling, research, and communications — all from the comfort of your home.",
    responsibilities: [
      "Manage calendars, schedule meetings, and send reminders",
      "Handle email correspondence professionally",
      "Conduct basic research and compile reports",
      "Coordinate with team members and external vendors",
      "Maintain organized records and filing systems",
    ],
    perks: ["Flexible schedule", "Multiple clients", "Skill development", "Monthly bonus"],
    posted: "1 day ago",
    urgent: true,
  },
  {
    id: 4,
    title: "Online Survey Analyst",
    company: "InsightPulse",
    type: "Remote | Freelance",
    pay: "₹5,000–10,000/mo",
    tag: "Flexible",
    category: "Research",
    icon: BarChart2,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    tagColor: "bg-amber-50 text-amber-700 border-amber-100",
    openings: 25,
    applicants: 150,
    skills: ["Analytical Thinking", "Internet Browsing", "Basic Computer"],
    experience: "No Experience",
    description: "InsightPulse connects market researchers with survey participants. As a Survey Analyst, you'll complete paid surveys on behalf of our clients, share honest feedback, and contribute to market research studies.",
    responsibilities: [
      "Complete assigned surveys accurately within given timeframes",
      "Provide genuine, thoughtful responses to survey questions",
      "Participate in product testing and feedback sessions",
      "Maintain account activity and review assignments daily",
      "Refer others and earn additional rewards",
    ],
    perks: ["No experience needed", "Work anytime", "Instant rewards", "Refer & earn"],
    posted: "3 hours ago",
    urgent: false,
  },
  {
    id: 5,
    title: "Copy-Paste & Form Filling",
    company: "DataBridge Corp",
    type: "Work From Home",
    pay: "₹7,000–12,000/mo",
    tag: "No Experience",
    category: "Data Entry",
    icon: FileText,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    tagColor: "bg-rose-50 text-rose-700 border-rose-100",
    openings: 30,
    applicants: 520,
    skills: ["Basic Typing", "Internet Access", "Attention to Detail"],
    experience: "No Experience",
    description: "DataBridge Corp offers simple copy-paste and form-filling tasks for individuals who want to earn from home without any prior experience. Work at your own pace and get paid on a task-completion basis.",
    responsibilities: [
      "Copy text from provided sources into spreadsheets or web forms",
      "Fill out digital forms accurately based on given information",
      "Verify data accuracy before submission",
      "Submit work within assigned deadlines",
      "Report issues or errors to the supervisor promptly",
    ],
    perks: ["Zero experience", "Daily tasks", "Per-task payment", "Simple instructions"],
    posted: "6 hours ago",
    urgent: true,
  },
  {
    id: 6,
    title: "Photo Editing Intern",
    company: "PixelStudio Pro",
    type: "Remote Internship",
    pay: "₹6,000–10,000/mo",
    tag: "Internship",
    category: "Design",
    icon: Camera,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    tagColor: "bg-teal-50 text-teal-700 border-teal-100",
    openings: 6,
    applicants: 95,
    skills: ["Photoshop/Canva", "Creativity", "Colour Theory", "Attention to Detail"],
    experience: "0–1 Year",
    description: "PixelStudio Pro is offering remote internships for aspiring photo editors. This is a great opportunity to build your portfolio, learn professional tools, and get hands-on editing experience.",
    responsibilities: [
      "Edit and retouch product and portrait photos as directed",
      "Apply colour correction, cropping, and background removal",
      "Work with creative briefs to deliver on-brand results",
      "Maintain organised project folders and version history",
      "Collaborate with designers for feedback and revisions",
    ],
    perks: ["Certificate provided", "Portfolio projects", "Mentorship", "Full-time opportunity"],
    posted: "2 days ago",
    urgent: false,
  },
  {
    id: 7,
    title: "Social Media Manager",
    company: "BrandWave Digital",
    type: "Remote | Full-Time",
    pay: "₹15,000–25,000/mo",
    tag: "Hot Job",
    category: "Marketing",
    icon: Wifi,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    tagColor: "bg-pink-50 text-pink-700 border-pink-100",
    openings: 4,
    applicants: 320,
    skills: ["Instagram/Facebook", "Content Creation", "Analytics", "Canva"],
    experience: "0–2 Years",
    description: "BrandWave Digital is hiring a dynamic Social Media Manager to grow and manage our clients' online presence. You'll create engaging content, run campaigns, and track performance metrics.",
    responsibilities: [
      "Develop and schedule social media content across platforms",
      "Engage with audience comments, DMs, and mentions",
      "Run paid ad campaigns on Meta and Google",
      "Analyse performance data and produce monthly reports",
      "Stay up-to-date with social media trends and algorithms",
    ],
    perks: ["Full-time remote", "PF & ESI", "Annual bonus", "Growth path"],
    posted: "4 hours ago",
    urgent: true,
  },
  {
    id: 8,
    title: "Customer Support Executive",
    company: "HelpDesk360",
    type: "Work From Home",
    pay: "₹12,000–20,000/mo",
    tag: "Immediate Join",
    category: "Support",
    icon: Headphones,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-100",
    openings: 20,
    applicants: 680,
    skills: ["Communication", "Problem Solving", "CRM Tools", "Hindi/English"],
    experience: "0–2 Years",
    description: "HelpDesk360 is seeking Customer Support Executives to handle inbound queries via chat and email. You'll be the first point of contact for customers and responsible for resolving issues efficiently.",
    responsibilities: [
      "Handle customer queries via chat, email, and sometimes calls",
      "Diagnose and resolve technical and non-technical issues",
      "Escalate complex issues to the right team",
      "Maintain a positive, empathetic customer interaction",
      "Log all interactions accurately in the CRM",
    ],
    perks: ["Shift flexibility", "Incentives", "Work from home", "Quick joining"],
    posted: "1 hour ago",
    urgent: true,
  },
  {
    id: 9,
    title: "Online Tutor",
    company: "EduBridge Learning",
    type: "Remote | Part-Time",
    pay: "₹500–1,500/hr",
    tag: "High Earning",
    category: "Education",
    icon: GraduationCap,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    openings: 50,
    applicants: 230,
    skills: ["Subject Knowledge", "Communication", "Patience", "Tech Savvy"],
    experience: "Any",
    description: "EduBridge Learning connects students with passionate tutors for online sessions. Teach from home, set your own schedule, and make a difference while earning great per-hour rates.",
    responsibilities: [
      "Conduct live online sessions via video call platforms",
      "Prepare customised lesson plans for each student",
      "Track student progress and provide regular feedback",
      "Answer doubts and provide study material",
      "Maintain punctuality and professionalism",
    ],
    perks: ["Own schedule", "Per-hour pay", "All subjects", "Grow your network"],
    posted: "12 hours ago",
    urgent: false,
  },
  {
    id: 10,
    title: "Web Research Analyst",
    company: "DataMinds Analytics",
    type: "Remote | Full-Time",
    pay: "₹10,000–16,000/mo",
    tag: "Analytical",
    category: "Research",
    icon: BookOpen,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    tagColor: "bg-orange-50 text-orange-700 border-orange-100",
    openings: 10,
    applicants: 180,
    skills: ["Internet Research", "Google Sheets", "Data Organisation", "English"],
    experience: "0–1 Year",
    description: "DataMinds Analytics is looking for Web Research Analysts to collect and organise information from the internet for client projects. This is a work-from-home opportunity suitable for freshers.",
    responsibilities: [
      "Research companies, products, and trends using online sources",
      "Compile findings into structured spreadsheets or reports",
      "Verify information accuracy from multiple sources",
      "Follow project guidelines and meet submission deadlines",
      "Flag inconsistencies or data gaps to the team",
    ],
    perks: ["WFH full-time", "Steady projects", "Skill building", "Stipend on joining"],
    posted: "3 days ago",
    urgent: false,
  },
  {
    id: 11,
    title: "Freelance Video Editor",
    company: "VidCraft Studios",
    type: "Remote | Freelance",
    pay: "₹15,000–40,000/mo",
    tag: "Creative",
    category: "Design",
    icon: Camera,
    iconBg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-600",
    tagColor: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
    openings: 5,
    applicants: 145,
    skills: ["Premiere Pro/DaVinci", "Motion Graphics", "Colour Grading"],
    experience: "1–3 Years",
    description: "VidCraft Studios produces content for YouTube creators, brands, and digital marketers. We're looking for skilled video editors who can deliver polished, engaging content on a freelance basis.",
    responsibilities: [
      "Edit raw footage into engaging, well-paced videos",
      "Add graphics, transitions, music, and sound effects",
      "Colour grade footage for consistent visual style",
      "Export videos in various formats and resolutions",
      "Collaborate with clients through revision rounds",
    ],
    perks: ["Project-based pay", "Creative freedom", "Long-term clients", "Portfolio pieces"],
    posted: "5 days ago",
    urgent: false,
  },
  {
    id: 12,
    title: "Back-End Data Processor",
    company: "Nexus Techworks",
    type: "Work From Home",
    pay: "₹9,000–14,000/mo",
    tag: "Fresher OK",
    category: "Data Entry",
    icon: Code,
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
    tagColor: "bg-slate-50 text-slate-700 border-slate-100",
    openings: 18,
    applicants: 290,
    skills: ["Data Handling", "Basic Excel", "Internet", "Accuracy"],
    experience: "0–1 Year",
    description: "Nexus Techworks needs Back-End Data Processors to manage and cleanse data collected from various platforms. The role involves organising raw data into usable formats for our analyst teams.",
    responsibilities: [
      "Receive raw data sets and clean them using Excel or Google Sheets",
      "Remove duplicates, fill blanks, and standardise formats",
      "Process batches of data according to project templates",
      "Submit processed files within agreed timelines",
      "Report data quality issues to the project manager",
    ],
    perks: ["Flexible hours", "Task bonuses", "Simple work", "Online training"],
    posted: "1 day ago",
    urgent: false,
  },
];

const categories = [
  { label: "Data Entry", icon: FileText, count: 45 },
  { label: "Writing", icon: PenLine, count: 28 },
  { label: "Design", icon: Camera, count: 19 },
  { label: "Support", icon: Headphones, count: 36 },
  { label: "Marketing", icon: TrendingUp, count: 22 },
  { label: "Education", icon: GraduationCap, count: 54 },
  { label: "Research", icon: BookOpen, count: 17 },
  { label: "Tech", icon: Code, count: 11 },
];

const whyUs = [
  { icon: ShieldCheck, title: "Verified Opportunities", desc: "Every listing is manually reviewed before publishing. Zero fake jobs, zero scams — guaranteed." },
  { icon: Zap, title: "5-Minute Application", desc: "Apply instantly with your Google account. No lengthy resume uploads or complicated forms." },
  { icon: Globe2, title: "100% Remote & Pan-India", desc: "Work from home anywhere in India. Open to students, freshers, and working professionals." },
  { icon: Lock, title: "Safe & Secure", desc: "Your data is AES-256 encrypted. We never share your information with third parties." },
  { icon: TrendingUp, title: "Career Growth Path", desc: "From internship to full-time — access multiple roles and grow your career step by step." },
  { icon: Heart, title: "Genuine HR Support", desc: "Real HR executives contact shortlisted candidates directly. Real people, real results." },
];

const stats = [
  { label: "Active Members", value: "12,000+", icon: Users },
  { label: "Jobs Available", value: "500+", icon: Briefcase },
  { label: "States Covered", value: "28+", icon: MapPin },
  { label: "Success Rate", value: "94%", icon: Star },
];

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Jaipur, Rajasthan",
    role: "Data Entry Specialist",
    text: "I was skeptical at first, but CareerMitra is genuinely trustworthy. Got placed in a data entry role within 3 days of applying. The process was smooth and the HR team was super responsive!",
    rating: 5,
    avatar: "P",
    avatarColor: "bg-indigo-500",
    verified: true,
  },
  {
    name: "Rohit Mishra",
    city: "Pune, Maharashtra",
    role: "Content Writer",
    text: "As a fresher, I struggled to find remote work. CareerMitra helped me land my first content writing gig within a week. The team is professional, responsive, and genuinely cares about your success.",
    rating: 5,
    avatar: "R",
    avatarColor: "bg-emerald-500",
    verified: true,
  },
  {
    name: "Sneha Kulkarni",
    city: "Bangalore, Karnataka",
    role: "Virtual Assistant",
    text: "Clean platform, very easy to use. I applied on Monday and received a WhatsApp from HR by Wednesday with my offer letter. Never seen such fast turnaround. Highly recommend CareerMitra!",
    rating: 5,
    avatar: "S",
    avatarColor: "bg-violet-500",
    verified: true,
  },
  {
    name: "Arjun Nair",
    city: "Kochi, Kerala",
    role: "Online Tutor",
    text: "I've been tutoring online through CareerMitra for 4 months now. Earning ₹25,000+ per month from home while completing my graduation. Best decision I've made for my career!",
    rating: 5,
    avatar: "A",
    avatarColor: "bg-amber-500",
    verified: true,
  },
  {
    name: "Kavita Rani",
    city: "Lucknow, UP",
    role: "Customer Support",
    text: "Joined CareerMitra with zero work experience. They helped me land a customer support role with a great company. The training provided made the transition smooth. Very grateful!",
    rating: 4,
    avatar: "K",
    avatarColor: "bg-rose-500",
    verified: true,
  },
  {
    name: "Deepak Yadav",
    city: "Hyderabad, Telangana",
    role: "Social Media Manager",
    text: "CareerMitra's job listings are fresh and legitimate. The social media manager role I got is fully remote, pays well, and came with proper onboarding. This platform is the real deal.",
    rating: 5,
    avatar: "D",
    avatarColor: "bg-teal-500",
    verified: true,
  },
];

const faqs = [
  { q: "Is CareerMitra a legitimate and trusted platform?", a: "Yes. CareerMitra is a verified career portal that manually reviews every job opportunity before listing. We have served over 12,000 professionals across India with transparent processes and genuine placements." },
  { q: "What types of jobs are available on CareerMitra?", a: "We offer a wide range of remote opportunities including data entry, content writing, virtual assistance, online surveys, copy-paste work, image editing, social media management, online tutoring, and more — suitable for freshers, students, and working professionals." },
  { q: "Why is there an application processing fee?", a: "To maintain a serious and efficient hiring process, we charge a small application processing fee of ₹50. Due to the high volume of applications we receive, this ensures we prioritise genuinely committed applicants and helps us provide a quality experience for both candidates and employers." },
  { q: "Is my personal data safe on CareerMitra?", a: "Absolutely. All data is encrypted using AES-256 standards. We do not sell or share your information with third parties. Please read our Privacy Policy for full details." },
  { q: "How will I be contacted after applying?", a: "Our HR team will reach out to shortlisted candidates via WhatsApp within 24–48 hours of application review. Make sure your contact details are accurate when you apply." },
  { q: "Can students and freshers apply?", a: "Yes! Many of our listings are specifically designed for students, freshers, and those with no prior work experience. We believe everyone deserves a fair chance at the start of their career." },
];

// ─── COMPONENT ─────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof allJobs[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    const u = await loginWithGoogle();
    if (u) router.push("/dashboard");
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || job.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* ── HERO (dark blue like Naukri) ────────────────────── */}
      <section className="relative hero-gradient hero-pattern overflow-hidden pt-16">
        <div className="container-lg relative z-10 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* badge */}
            <motion.div {...fadeUp(0)} className="mb-5 flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                <Flame size={12} className="text-orange-300" />
                India's Fastest Growing Career Portal — 12,000+ Members
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.2] tracking-tight text-white mb-4"
            >
              Find Your Dream{" "}
              <span className="text-orange-400">Work From Home</span>
              {" "}& Remote Job
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-base text-white font-medium mb-8 max-w-xl mx-auto leading-relaxed">
              CareerMitra connects freshers, students, and professionals with verified remote opportunities across India — data entry, writing, tutoring and more.
            </motion.p>

            {/* search bar */}
            <motion.div {...fadeUp(0.3)} className="search-bar max-w-2xl mx-auto mb-5">
              <div className="flex-1 flex items-center gap-2.5 px-4">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search jobs, skills, or roles…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && router.push("/dashboard")}
                  className="flex-1 text-sm font-medium text-slate-700 placeholder:text-slate-400 bg-transparent border-none outline-none py-3"
                  aria-label="Search jobs"
                />
              </div>
              <div className="flex items-center gap-1 px-1">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="btn-accent text-sm px-6 py-3 rounded-lg"
                  aria-label="Search jobs"
                >
                  Search
                </button>
              </div>
            </motion.div>

            {/* popular tags */}
            <motion.div {...fadeUp(0.35)} className="flex flex-wrap justify-center gap-2 mb-10">
              {["Data Entry", "Content Writing", "Virtual Assistant", "Online Tutor", "Fresher Jobs"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setSearchQuery(tag); }}
                  className="px-3 py-1.5 text-xs font-bold bg-white/15 border border-white/30 rounded-full text-white hover:bg-white/25 hover:text-white transition-all"
                >
                  {tag}
                </button>
              ))}
            </motion.div>

            {/* auth CTA */}
            <motion.div {...fadeUp(0.4)} className="flex justify-center">
              {authLoading ? (
                <Loader2 className="animate-spin text-white" size={28} />
              ) : user ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="btn-accent gap-3 px-8 py-3.5 text-base rounded-xl"
                >
                  Continue Application <ArrowRight size={18} />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <button
                    onClick={handleLogin}
                    className="btn-accent gap-3 px-8 py-3.5 text-base rounded-xl"
                    id="hero-google-login"
                  >
                    <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#fff" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.9-6.9C35.7 2.4 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l8 6.2C12.5 13.4 17.8 9.5 24 9.5z"/><path fill="#fff" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.8c-.3 1.9-1.9 4.8-5.4 6.7l8.3 6.5c4.8-4.4 7.8-10.8 7.8-16.7z"/><path fill="#fff" d="M10.7 28.5c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-8-6.2C1 16.3 0 20 0 24s1 7.7 2.7 11.3l8-6.8z"/><path fill="#fff" d="M24 48c6.5 0 12-2.1 16-5.8l-8.3-6.5c-2.3 1.6-5.3 2.7-7.7 2.7-6.2 0-11.5-3.9-13.4-9.4l-8 6.8C6.7 42.6 14.7 48 24 48z"/></svg>
                    Sign In & Apply Free
                  </button>
                </div>
              )}
            </motion.div>

            {/* trust row */}
            <motion.div {...fadeUp(0.5)} className="mt-8 trust-row justify-center">
              <span className="trust-item-hero"><ShieldCheck size={15} className="text-green-300" />AES-256 Encrypted</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="trust-item-hero"><CheckCircle2 size={15} className="text-blue-200" />Verified Employers</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="trust-item-hero"><Clock size={15} className="text-orange-300" />24-hr HR Response</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C360 0 720 60 1080 30 1260 15 1380 0 1440 0V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-white py-10 border-b border-slate-100" aria-label="Platform statistics">
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div key={label} {...fadeUp(i * 0.1)} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="stat-number text-slate-900 mb-0.5">{value}</div>
                <div className="text-sm text-slate-700 font-semibold">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE CATEGORIES ───────────────────────────────── */}
      <section className="bg-slate-50 py-10 border-b border-slate-100">
        <div className="container-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Browse by Category</h2>
            <button onClick={() => router.push("/dashboard")} className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View all <ChevronRight size={16} />
            </button>
          </div>
          {/* Mobile: horizontal scroll | md+: 8-column grid */}
          <div className="flex md:grid md:grid-cols-8 gap-3 overflow-x-auto pb-1 -mx-1 px-1 md:overflow-visible">
            {categories.map(({ label, icon: Icon, count }) => (
              <button
                key={label}
                onClick={() => setActiveCategory(label === activeCategory ? "All" : label)}
                className={`category-pill shrink-0 md:shrink ${activeCategory === label ? "border-blue-500 bg-blue-50 text-blue-700" : "text-slate-600"}`}
                style={{ minWidth: '80px' }}
              >
                <Icon size={18} className={activeCategory === label ? "text-blue-600" : "text-slate-500"} />
                <span className="text-xs font-semibold leading-tight">{label}</span>
                <span className="text-[10px] text-slate-600 font-semibold">{count} Jobs</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS ──────────────────────────────────── */}
      <section className="section-pad bg-white" aria-labelledby="featured-jobs-heading">
        <div className="container-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="section-label"><Briefcase size={12} />Latest Openings</span>
              <h2 id="featured-jobs-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                Work From Home Jobs — Hiring Now
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`btn-ghost text-sm ${activeCategory === "All" ? "border-blue-300 text-blue-700 bg-blue-50" : ""}`}
              >
                <Filter size={14} /> All Jobs
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
            {filteredJobs.slice(0, 9).map((job, i) => {
              const Icon = job.icon;
              return (
                <motion.article
                  key={job.id}
                  {...fadeUp(i * 0.05)}
                  className="job-card group"
                  onClick={() => setSelectedJob(job)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedJob(job)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl ${job.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={job.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="job-card-title truncate">{job.title}</h3>
                      <p className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                        <Building2 size={11} /> {job.company}
                      </p>
                    </div>
                    {job.urgent && (
                      <span className="badge badge-hot shrink-0 text-[10px]">🔥 Urgent</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="tag-chip"><MapPin size={10} /> {job.type}</span>
                    <span className="tag-chip"><Clock size={10} /> {job.experience}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-800">{job.pay}</span>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5">{job.openings} openings · {job.applicants} applied</p>
                    </div>
                    <span className={`badge border text-[10px] ${job.tagColor}`}>{job.tag}</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-600 font-medium">{job.posted}</span>
                    <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Search size={48} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No jobs found for "{searchQuery}"</p>
              <p className="text-sm mt-1">Try a different keyword or browse all categories</p>
            </div>
          )}

          <div className="text-center">
            <button onClick={() => router.push("/dashboard")} className="btn-outline">
              View All {allJobs.length}+ Openings <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────── */}
      <section className="section-pad bg-slate-50" aria-labelledby="why-us-heading">
        <div className="container-lg">
          <div className="text-center mb-10">
            <span className="section-label"><Award size={12} />Why CareerMitra</span>
            <h2 id="why-us-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              A Platform Built on Trust & Transparency
            </h2>
            <p className="text-slate-700 max-w-lg mx-auto text-sm">
              We believe every applicant deserves a fair, safe, and professional experience when searching for remote work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.08)} className="card p-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-base">{title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section className="section-pad bg-white" aria-labelledby="how-it-works-heading">
        <div className="container-lg">
          <div className="text-center mb-10">
            <span className="section-label"><Zap size={12} />Simple Process</span>
            <h2 id="how-it-works-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Start Your Remote Career in 3 Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Create Free Account", desc: "Sign in with your Google account in seconds. No lengthy registration required.", icon: Users },
              { step: "02", title: "Fill Your Application", desc: "Choose your preferred job roles and complete your application with basic details.", icon: FileText },
              { step: "03", title: "Get Selected by HR", desc: "Our HR team reviews applications and contacts shortlisted candidates via WhatsApp within 24 hours.", icon: CheckCircle2 },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div key={step} {...fadeUp(i * 0.1)} className="text-center relative">
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
                    <span className="text-lg font-black">{step}</span>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-[calc(100vw/3-4rem)] h-0.5 bg-blue-100" style={{ width: "100px", left: "100%" }} />
                  )}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed max-w-[200px] mx-auto">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section className="section-pad bg-slate-50" aria-labelledby="testimonials-heading">
        <div className="container-lg">
          <div className="text-center mb-10">
            <span className="section-label"><Heart size={12} />Success Stories</span>
            <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              What Our Members Say
            </h2>
            <p className="text-slate-700 max-w-lg mx-auto text-sm">
              Real experiences from professionals who found their remote careers through CareerMitra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map(({ name, city, role, text, rating, avatar, avatarColor, verified }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.08)} className="testimonial-card" itemScope itemType="https://schema.org/Review">
                <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Organization">
                  <meta itemProp="name" content="CareerMitra" />
                </div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }).map((_, j) => (
                      <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, j) => (
                      <Star key={j} size={13} className="text-slate-200 fill-slate-200" />
                    ))}
                  </div>
                  {verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-800 leading-relaxed mb-4 italic" itemProp="reviewBody">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {avatar}
                  </div>
                  <div itemProp="author" itemScope itemType="https://schema.org/Person">
                    <p className="text-sm font-bold text-slate-900" itemProp="name">{name}</p>
                    <p className="text-xs text-slate-600 font-medium">{role} · {city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="section-pad bg-white" aria-labelledby="faq-heading">
        <div className="container-lg">
          <div className="text-center mb-10">
            <span className="section-label">FAQ</span>
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-700 max-w-lg mx-auto text-sm">
              Have questions? We have answers. Contact our support team if you need more help.
            </p>
          </div>

          <div className="max-w-2xl mx-auto" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="faq-item" itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  itemProp="name"
                >
                  {q}
                  {openFaq === i
                    ? <ChevronUp size={18} className="text-blue-600 shrink-0" />
                    : <ChevronDown size={18} className="text-slate-400 shrink-0" />
                  }
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      key="faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="faq-answer overflow-hidden"
                      itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer"
                    >
                      <span itemProp="text">{a}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="hero-gradient hero-pattern py-16 relative overflow-hidden" aria-label="Call to action">
        <div className="container-lg relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 text-white border border-white/30 mb-5">
            <Zap size={12} className="text-orange-300" />Start Today — It's Free
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Start Your Remote Career Journey?
          </h2>
          <p className="text-white font-medium max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Join thousands of verified professionals who found their online jobs through CareerMitra. Apply today and get a response within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={user ? () => router.push("/dashboard") : handleLogin}
              className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2 justify-center text-sm"
            >
              Apply Now — It's Free <ArrowRight size={18} />
            </button>
            <a
              href="/contact"
              className="border-2 border-white/50 bg-white/10 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 justify-center text-sm"
            >
              <Phone size={18} /> Talk to Support
            </a>
          </div>
        </div>
      </section>

      {/* ── JOB DETAIL MODAL ────────────────────────────────── */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setSelectedJob(null)}
          >
            <motion.div
              className="modal-box"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl ${selectedJob.iconBg} flex items-center justify-center shrink-0`}>
                    <selectedJob.icon size={26} className={selectedJob.iconColor} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedJob.title}</h2>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-sm text-slate-500 flex items-center gap-1.5">
                        <Building2 size={13} /> {selectedJob.company}
                      </span>
                      {selectedJob.urgent && (
                        <span className="badge badge-hot text-[10px]">🔥 Urgent Hiring</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Quick Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: MapPin, label: "Location", value: selectedJob.type },
                    { icon: IndianRupee, label: "Salary", value: selectedJob.pay },
                    { icon: Briefcase, label: "Experience", value: selectedJob.experience },
                    { icon: Users, label: "Openings", value: `${selectedJob.openings} roles` },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <Icon size={16} className="text-blue-500 mx-auto mb-1" />
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                    <BookOpen size={15} className="text-blue-500" /> About This Role
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedJob.description}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                    <CheckCircle2 size={15} className="text-blue-500" /> Key Responsibilities
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedJob.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <ChevronRight size={14} className="text-blue-400 mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills & Perks */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">Skills Required</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.skills.map((s) => (
                        <span key={s} className="tag-chip text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">Perks & Benefits</h3>
                    <div className="space-y-1">
                      {selectedJob.perks.map((p) => (
                        <div key={p} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1"><Eye size={12} /> {selectedJob.applicants} applicants</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> Posted {selectedJob.posted}</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 pt-0 flex gap-3">
                <button
                  onClick={() => { setSelectedJob(null); router.push("/dashboard"); }}
                  className="btn-primary flex-1 py-3.5 rounded-xl text-sm"
                >
                  Apply Now <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="btn-ghost px-4 py-3.5 rounded-xl text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}