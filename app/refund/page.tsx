import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | OmegaHiring",
  description: "OmegaHiring's Refund Policy — clear and transparent information about our application processing fee and non-refundable payment terms.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  const lastUpdated = "May 11, 2025";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container-lg max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label">Legal</span>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Refund Policy</h1>
          <p className="text-slate-500 text-sm">Last Updated: {lastUpdated}</p>
        </div>

        {/* Key Statement */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6 flex gap-4">
          <div className="text-2xl">⚠️</div>
          <div>
            <h2 className="font-bold text-amber-900 mb-1">Important Notice</h2>
            <p className="text-amber-800 text-sm leading-relaxed">
              All payments made on OmegaHiring are <strong>non-refundable</strong>. Please read this policy carefully before completing any payment.
            </p>
          </div>
        </div>

        <div className="card p-8 space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Application Processing Fee</h2>
            <p className="mb-3">OmegaHiring charges a small application processing fee to maintain a quality hiring environment. This fee is used to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Verify the identity and seriousness of applicants</li>
              <li>Cover administrative and verification costs</li>
              <li>Ensure genuine, committed applicants are prioritized</li>
              <li>Support our HR team's review and selection process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Non-Refundable Policy</h2>
            <p className="mb-3">The application processing fee paid on OmegaHiring is <strong>strictly non-refundable</strong> under all circumstances, including but not limited to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Non-selection after application review</li>
              <li>Withdrawal of application after submission</li>
              <li>Duplicate applications</li>
              <li>Change of mind after payment</li>
              <li>Inability to complete the application after payment</li>
              <li>Account suspension due to policy violations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Payment Errors</h2>
            <p>In the rare case of a technical payment error where money was debited but no application was registered, please contact us within <strong>48 hours</strong> at <a href="mailto:support@careers.abhyasmitra.in" className="text-indigo-600 font-semibold hover:underline">support@careers.abhyasmitra.in</a> with your UTR/transaction ID and payment screenshot. We will investigate and resolve the issue promptly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. No Guarantee of Selection</h2>
            <p>Payment of the processing fee does not guarantee interview calls, selection, or employment. Hiring decisions are made solely based on applicant qualifications and employer requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Transparency Commitment</h2>
            <p>We are committed to full transparency. This policy is displayed clearly before every payment. By proceeding with payment, you confirm that you have read, understood, and agreed to this Refund Policy and our Terms & Conditions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Contact & Support</h2>
            <p>For any payment-related concerns, please contact our support team:</p>
            <ul className="mt-3 space-y-2">
              <li>📧 Email: <a href="mailto:support@careers.abhyasmitra.in" className="text-indigo-600 font-semibold hover:underline">support@careers.abhyasmitra.in</a></li>
              <li>📱 Telegram: <a href="https://t.me/omegaofts" className="text-indigo-600 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">@omegaofts</a></li>
            </ul>
            <p className="mt-3 text-sm text-slate-500">Response time: Within 24–48 business hours.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
