import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OmegaHiring",
  description: "OmegaHiring's Privacy Policy — how we collect, use, and protect your personal information on our career portal.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const lastUpdated = "May 11, 2025";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container-lg max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label">Legal</span>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last Updated: {lastUpdated}</p>
        </div>

        <div className="card p-8 space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h2>
            <p>OmegaHiring ("we", "our", or "us"), operated under AbhyasMitra at careers.abhyasmitra.in, is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, and how we protect it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">When you use OmegaHiring, we may collect the following information:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Account Information:</strong> Name, email address, and profile photo via Google Sign-In (OAuth 2.0).</li>
              <li><strong>Application Data:</strong> Full name, phone number, city, date of birth, educational qualification, preferred job roles, and transaction reference (UTR).</li>
              <li><strong>Usage Data:</strong> IP address, browser type, device information, and pages visited — collected automatically for analytics and security.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To process and review your job application</li>
              <li>To verify your identity and payment</li>
              <li>To contact shortlisted candidates via WhatsApp or email</li>
              <li>To improve and personalize your platform experience</li>
              <li>To maintain platform security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Security</h2>
            <p>All data is stored on Google Firebase with AES-256 encryption. We implement industry-standard security measures including secure HTTPS transmission, access controls, and regular security audits. We do not store payment card details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Sharing</h2>
            <p>We do <strong>not</strong> sell, rent, or trade your personal information to third parties. We may share your data only with:</p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li>Verified hiring partners (for application processing purposes only)</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Cookies</h2>
            <p>We use essential cookies to maintain your login session and improve site functionality. We do not use tracking cookies for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal data. To exercise these rights, contact us at <a href="mailto:support@careers.abhyasmitra.in" className="text-indigo-600 font-semibold hover:underline">support@careers.abhyasmitra.in</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Third-Party Services</h2>
            <p>We use Google Firebase (authentication and database) and Google OAuth. These services have their own privacy policies which we encourage you to review.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Contact Us</h2>
            <p>For any privacy-related concerns, please write to us at <a href="mailto:support@careers.abhyasmitra.in" className="text-indigo-600 font-semibold hover:underline">support@careers.abhyasmitra.in</a> or reach us via Telegram at @omegaofts.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
