import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | OmegaHiring – Trusted Remote Career Portal",
  description: "Learn about OmegaHiring — India's trusted platform for verified remote jobs, work-from-home opportunities, and online internships. Our mission, values, and team.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container-lg max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About OmegaHiring</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            A verified career portal built on trust, transparency, and genuine opportunities for every Indian professional.
          </p>
        </div>

        {/* Mission */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            OmegaHiring was founded with a single goal: to make genuine remote work opportunities accessible to every Indian — whether you're a student, a fresher, or an experienced professional looking to work from home.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We saw a massive gap in the market. Hundreds of thousands of people search for online jobs every day, but many fall victim to fake listings and fraudulent platforms. We decided to build something different — a platform where every opportunity is manually verified before it goes live.
          </p>
        </div>

        {/* Values */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What We Stand For</h2>
          <div className="space-y-5">
            {[
              { title: "Transparency", desc: "We clearly communicate our processes, fees, and expectations. No hidden terms, no surprises." },
              { title: "Verified Opportunities", desc: "Every job listing on OmegaHiring is manually reviewed by our team to ensure it's legitimate and fair." },
              { title: "Privacy First", desc: "We treat your personal data with the highest respect. Your information is encrypted and never sold to third parties." },
              { title: "Inclusivity", desc: "Our platform is designed for everyone — from students and freshers to professionals seeking supplemental remote income." },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div className="card p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Platform</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            OmegaHiring operates under AbhyasMitra — a digital education and career services company helping students and professionals grow their careers online. Our career portal at <strong>careers.abhyasmitra.in</strong> serves as a focused hub for remote work and online job opportunities.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We specialize in remote and work-from-home roles including data entry, content writing, virtual assistance, online surveys, image editing, and more. Our application process is simple, fast, and secure.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active Members", value: "10,000+" },
            { label: "Jobs Listed", value: "500+" },
            { label: "States Covered", value: "28+" },
            { label: "Applications Processed", value: "25,000+" },
          ].map(({ label, value }) => (
            <div key={label} className="card p-5 text-center">
              <div className="text-2xl font-black text-indigo-600 mb-1">{value}</div>
              <div className="text-xs text-slate-500 font-semibold">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Find Your Remote Job?</h2>
          <p className="text-indigo-100 mb-6 text-sm">Join thousands of professionals who found genuine online work through OmegaHiring.</p>
          <a href="/dashboard" className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
            Browse Jobs Now →
          </a>
        </div>

      </div>
    </div>
  );
}
