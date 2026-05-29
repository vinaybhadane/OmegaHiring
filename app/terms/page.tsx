import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | CareerMitra",
  description: "Read CareerMitra's Terms & Conditions — the rules and guidelines governing use of our remote jobs and career platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const lastUpdated = "May 11, 2025";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container-lg max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label">Legal</span>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Terms & Conditions</h1>
          <p className="text-slate-500 text-sm">Last Updated: {lastUpdated}</p>
        </div>

        <div className="card p-8 space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using CareerMitra (careers.abhyasmitra.in), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use this platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. About the Platform</h2>
            <p>CareerMitra is a career portal operated by AbhyasMitra that connects job seekers with remote and work-from-home opportunities. We act as an intermediary between applicants and hiring organizations and do not guarantee employment.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. User Responsibilities</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>You must provide accurate, truthful, and complete information in your application.</li>
              <li>You must be at least 16 years of age to use this platform.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must not use the platform for any fraudulent, unlawful, or harmful purpose.</li>
              <li>You must not submit multiple applications for the same position using different accounts.</li>
              <li>You agree not to misrepresent your qualifications, experience, or identity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Application Processing Fee & Payment Terms</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-amber-800 font-semibold text-sm">
                ⚠️ Important: Any payment made on the CareerMitra platform is non-refundable.
              </p>
            </div>
            <p className="mb-3">To maintain a serious and efficient hiring process, CareerMitra charges a small application processing fee. This fee helps us:</p>
            <ul className="space-y-2 list-disc list-inside mb-3">
              <li>Verify the seriousness and commitment of applicants</li>
              <li>Cover administrative and verification costs</li>
              <li>Maintain the quality of our hiring pipeline for partner organizations</li>
            </ul>
            <p>The processing fee is a one-time, non-refundable charge. Payment of this fee does not guarantee selection or employment. By completing the payment and submitting your application, you acknowledge and accept these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. No Employment Guarantee</h2>
            <p>CareerMitra does not guarantee job placement, interview calls, or employment outcomes. Selection depends entirely on the requirements of the hiring organizations. We process and forward applications but do not control final hiring decisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Intellectual Property</h2>
            <p>All content on CareerMitra — including logos, text, graphics, and code — is the property of AbhyasMitra. You may not reproduce, copy, or use any content without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Limitation of Liability</h2>
            <p>CareerMitra shall not be held liable for any direct, indirect, incidental, or consequential damages arising from use of our platform, including but not limited to loss of income, employment opportunity, or data. We provide our services "as is" without warranties of any kind.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Account Suspension</h2>
            <p>We reserve the right to suspend or terminate any account that violates these terms, provides false information, or engages in fraudulent activity. No refund will be issued upon account termination due to policy violations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Changes to Terms</h2>
            <p>CareerMitra reserves the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting. Continued use of the platform constitutes acceptance of revised terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Contact</h2>
            <p>For queries regarding these terms, contact us at <a href="mailto:support@careers.abhyasmitra.in" className="text-indigo-600 font-semibold hover:underline">support@careers.abhyasmitra.in</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
