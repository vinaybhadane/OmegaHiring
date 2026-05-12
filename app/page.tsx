"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { loginWithGoogle } from "@/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShieldCheck, Briefcase, Star, ArrowRight, Users, Loader2,
  Search, MapPin, Clock, CheckCircle2, Zap, Globe2, Lock,
  TrendingUp, ChevronDown, ChevronUp, Award, Heart, Phone,
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────
const featuredJobs = [
  { title: "Data Entry Specialist", type: "Work From Home", pay: "₹8,000–15,000/mo", tag: "Fresher OK", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { title: "Content Writer", type: "Remote | Part-Time", pay: "₹10,000–20,000/mo", tag: "Flexible Hours", color: "bg-violet-50 text-violet-700 border-violet-100" },
  { title: "Virtual Assistant", type: "Work From Home", pay: "₹12,000–18,000/mo", tag: "Student Friendly", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { title: "Online Survey Analyst", type: "Remote | Freelance", pay: "₹5,000–10,000/mo", tag: "Flexible", color: "bg-amber-50 text-amber-700 border-amber-100" },
  { title: "Copy-Paste Assistant", type: "Work From Home", pay: "₹7,000–12,000/mo", tag: "No Experience", color: "bg-rose-50 text-rose-700 border-rose-100" },
  { title: "Image Editing Intern", type: "Remote Internship", pay: "₹6,000–9,000/mo", tag: "Internship", color: "bg-teal-50 text-teal-700 border-teal-100" },
];

const whyUs = [
  { icon: ShieldCheck, title: "Verified Opportunities", desc: "Every listing is manually reviewed and verified before posting. No fake jobs, no scams — ever." },
  { icon: Zap, title: "Quick Application", desc: "Apply in under 5 minutes with your Google account. No lengthy resume uploads or forms." },
  { icon: Globe2, title: "100% Remote & Pan-India", desc: "Work from the comfort of your home. Available for students, freshers, and professionals across India." },
  { icon: Lock, title: "Safe & Secure", desc: "Your data is encrypted and protected. We follow strict privacy guidelines to keep your information safe." },
  { icon: TrendingUp, title: "Career Growth", desc: "Access multiple roles and grow your career step by step, from internship to full-time employment." },
  { icon: Heart, title: "Genuine Support", desc: "Our HR team contacts shortlisted candidates directly. Real people, real support, real results." },
];

const stats = [
  { label: "Active Members", value: "10,000+", icon: Users },
  { label: "Jobs Posted", value: "500+", icon: Briefcase },
  { label: "States Covered", value: "28+", icon: MapPin },
  { label: "Success Rate", value: "92%", icon: Star },
];

const testimonials = [
  { name: "Priya S.", city: "Jaipur", role: "Data Entry", text: "I was skeptical at first, but OmegaHiring is genuinely trustworthy. I got placed in a data entry role within 3 days of applying. The process was smooth and transparent.", rating: 5 },
  { name: "Rohit M.", city: "Pune", role: "Content Writer", text: "As a fresher, I was struggling to find remote work. OmegaHiring helped me land my first content writing gig. The team is professional and responsive.", rating: 5 },
  { name: "Sneha K.", city: "Delhi", role: "Virtual Assistant", text: "The platform is clean, fast, and very easy to use. I applied on a Monday and received a WhatsApp confirmation by Wednesday. Highly recommend!", rating: 5 },
];

const faqs = [
  { q: "Is OmegaHiring a legitimate and trusted platform?", a: "Yes. OmegaHiring is a verified career portal that manually reviews every job opportunity before listing. We have served over 10,000 professionals across India with transparent processes and genuine placements." },
  { q: "What types of jobs are available on OmegaHiring?", a: "We offer a wide range of remote opportunities including data entry, content writing, virtual assistance, online surveys, copy-paste work, image editing, and more — suitable for freshers, students, and working professionals." },
  { q: "Why is there an application processing fee?", a: "To maintain a serious and efficient hiring process, we charge a small application processing fee. Due to the high volume of hiring requests we receive, this helps us prioritize genuine and committed applicants only. This ensures a quality experience for both applicants and employers." },
  { q: "Is my personal data safe on OmegaHiring?", a: "Absolutely. All data is encrypted using AES-256 standards. We do not sell or share your information with third parties. Please read our Privacy Policy for full details." },
  { q: "How will I be contacted after applying?", a: "Our HR team will reach out to shortlisted candidates via WhatsApp within 24–48 hours of application review. Make sure your contact details are accurate." },
  { q: "Can students and freshers apply?", a: "Yes! Many of our listings are specifically designed for students, freshers, and those with no prior experience. We believe everyone deserves a fair chance at their career start." },
];

// ─── COMPONENT ─────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center hero-gradient grid-pattern overflow-hidden pt-20">
        {/* decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-indigo-100 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-violet-100 rounded-full opacity-20 blur-3xl pointer-events-none" />

        <div className="container-lg relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">

            {/* trust badge */}
            <motion.div {...fadeUp(0)} className="mb-6 flex justify-center">
              <span className="badge badge-brand">
                <Star className="w-3 h-3 fill-current" />
                Trusted by 10,000+ Professionals Across India
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1 {...fadeUp(0.1)} className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight text-slate-900 mb-6">
              Find Verified{" "}
              <span className="gradient-text">Work From Home</span>
              {" "}& Remote Jobs in India
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
              OmegaHiring connects freshers, students, and professionals with genuine remote opportunities — data entry, content writing, virtual assistance and more.
            </motion.p>

            {/* search bar */}
            <motion.div {...fadeUp(0.3)} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-2 flex gap-2 mb-6 max-w-xl mx-auto">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search jobs, roles, or skills…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm font-medium text-slate-700 placeholder:text-slate-400 bg-transparent border-none outline-none py-2"
                  aria-label="Search jobs"
                />
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="btn-primary text-sm px-5 py-2.5 rounded-xl"
                aria-label="Search jobs button"
              >
                Search Jobs
              </button>
            </motion.div>

            {/* popular tags */}
            <motion.div {...fadeUp(0.35)} className="flex flex-wrap justify-center gap-2 mb-12">
              {["Data Entry", "Content Writing", "Work From Home", "Fresher Jobs", "Internship"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => router.push("/dashboard")}
                  className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all"
                >
                  {tag}
                </button>
              ))}
            </motion.div>

            {/* auth CTA */}
            <motion.div {...fadeUp(0.4)} className="flex justify-center">
              {authLoading ? (
                <Loader2 className="animate-spin text-indigo-600" size={28} />
              ) : user ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="btn-primary gap-3 px-8 py-4 text-base"
                >
                  Continue Your Application <ArrowRight size={18} />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <button
                    onClick={handleLogin}
                    className="btn-primary gap-3 px-8 py-4 text-base"
                    id="hero-google-login"
                  >
                    <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.9-6.9C35.7 2.4 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l8 6.2C12.5 13.4 17.8 9.5 24 9.5z"/><path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.8c-.3 1.9-1.9 4.8-5.4 6.7l8.3 6.5c4.8-4.4 7.8-10.8 7.8-16.7z"/><path fill="#4A90E2" d="M10.7 28.5c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-8-6.2C1 16.3 0 20 0 24s1 7.7 2.7 11.3l8-6.8z"/><path fill="#FBBC05" d="M24 48c6.5 0 12-2.1 16-5.8l-8.3-6.5c-2.3 1.6-5.3 2.7-7.7 2.7-6.2 0-11.5-3.9-13.4-9.4l-8 6.8C6.7 42.6 14.7 48 24 48z"/></svg>
                    Sign In & Apply Now
                  </button>
                  <span className="text-xs text-slate-400 font-medium">Free to join · No spam</span>
                </div>
              )}
            </motion.div>

            {/* trust row */}
            <motion.div {...fadeUp(0.5)} className="mt-10 trust-row justify-center">
              <span className="trust-item"><ShieldCheck size={15} className="text-emerald-500" />AES-256 Encrypted</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="trust-item"><CheckCircle2 size={15} className="text-indigo-500" />Verified Employers</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="trust-item"><Clock size={15} className="text-amber-500" />24-hr Response</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-slate-900 py-14" aria-label="Platform statistics">
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div key={label} {...fadeUp(i * 0.1)} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Icon size={20} className="text-indigo-400" />
                  </div>
                </div>
                <div className="stat-number text-white mb-1">{value}</div>
                <div className="text-sm text-slate-400 font-medium">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS ──────────────────────────────────── */}
      <section className="section-pad bg-white" aria-labelledby="featured-jobs-heading">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="section-label"><Briefcase size={12} />Latest Openings</span>
            <h2 id="featured-jobs-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Work From Home Jobs Hiring Now
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Browse our latest verified remote job listings. New opportunities added daily for freshers, students, and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {featuredJobs.map((job, i) => (
              <motion.article
                key={job.title}
                {...fadeUp(i * 0.07)}
                className="card p-5 cursor-pointer group"
                onClick={() => router.push("/dashboard")}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Briefcase size={20} className="text-indigo-600" />
                  </div>
                  <span className={`badge border text-[10px] ${job.color}`}>{job.tag}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                  <MapPin size={12} className="text-slate-400" />{job.type}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">{job.pay}</span>
                  <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Apply <ArrowRight size={12} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => router.push("/dashboard")} className="btn-outline">
              View All Openings <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────── */}
      <section className="section-pad bg-slate-50" aria-labelledby="why-us-heading">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="section-label"><Award size={12} />Why OmegaHiring</span>
            <h2 id="why-us-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              A Platform Built on Trust & Transparency
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              We believe every applicant deserves a fair, safe, and professional experience when searching for online jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.08)} className="card p-6">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section className="section-pad bg-white" aria-labelledby="how-it-works-heading">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="section-label"><Zap size={12} />Simple Process</span>
            <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Start Your Remote Career in 3 Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Create Free Account", desc: "Sign in with your Google account in seconds. No lengthy registration needed." },
              { step: "02", title: "Fill Application", desc: "Choose your preferred job roles and complete your application with basic details." },
              { step: "03", title: "Get Selected", desc: "Our HR team reviews applications and contacts shortlisted candidates via WhatsApp within 24 hours." },
            ].map(({ step, title, desc }, i) => (
              <motion.div key={step} {...fadeUp(i * 0.1)} className="text-center relative">
                <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4 shadow-lg shadow-indigo-100">
                  {step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-7 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-indigo-100" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section className="section-pad bg-slate-50" aria-labelledby="testimonials-heading">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="section-label"><Heart size={12} />Success Stories</span>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Members Say
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Real experiences from professionals who found their remote careers through OmegaHiring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, city, role, text, rating }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.1)} className="testimonial-card" itemScope itemType="https://schema.org/Review">
                <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Organization">
                  <meta itemProp="name" content="OmegaHiring" />
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 italic" itemProp="reviewBody">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {name[0]}
                  </div>
                  <div itemProp="author" itemScope itemType="https://schema.org/Person">
                    <p className="text-sm font-bold text-slate-900" itemProp="name">{name}</p>
                    <p className="text-xs text-slate-400">{role} · {city}</p>
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
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Have questions? We have answers. If you need more help, our support team is always ready.
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
                  {openFaq === i ? <ChevronUp size={18} className="text-indigo-600 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div
                    className="faq-answer"
                    itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer"
                  >
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <span itemProp="text">{a}</span>
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="section-pad bg-indigo-600 relative overflow-hidden" aria-label="Call to action">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="container-lg relative z-10 text-center">
          <span className="badge bg-white/20 text-white border-white/20 mb-6">
            <Zap size={12} />Start Today — It's Free
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Remote Career Journey?
          </h2>
          <p className="text-indigo-100 max-w-lg mx-auto mb-8 text-base leading-relaxed">
            Join thousands of verified professionals who found their online jobs through OmegaHiring. Apply today and get a response within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={user ? () => router.push("/dashboard") : handleLogin}
              className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-all shadow-lg flex items-center gap-2 justify-center"
            >
              Apply Now — It's Free <ArrowRight size={18} />
            </button>
            <a href="/contact" className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2 justify-center">
              <Phone size={18} /> Talk to Support
            </a>
          </div>
        </div>
      </section>
    </>
  );
}