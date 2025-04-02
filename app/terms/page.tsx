export default function TermsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">1. Acceptance of Terms</h2>
          <div className="space-y-4">
            <p>By accessing and using BalDr, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">2. Use License</h2>
          <div className="space-y-4">
            <p>Permission is granted to temporarily access BalDr for personal, non-commercial use only. This license does not include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modifying or copying our materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Attempting to decompile or reverse engineer our software</li>
              <li>Removing any copyright or proprietary notations</li>
              <li>Transferring materials to another person</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">3. User Accounts</h2>
          <div className="space-y-4">
            <p>To use certain features of BalDr, you must register for an account. You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any security breaches</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">4. AI Services</h2>
          <div className="space-y-4">
            <p>Our AI-powered services are provided "as is" and "as available". We do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The accuracy of AI recommendations</li>
              <li>Uninterrupted access to AI services</li>
              <li>Error-free operation of AI features</li>
              <li>Results from following AI advice</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">5. Product Purchases</h2>
          <div className="space-y-4">
            <p>When purchasing products through BalDr:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to modify or discontinue products</li>
              <li>We are not responsible for typographical errors</li>
              <li>Quantities may be limited and subject to availability</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">6. Limitation of Liability</h2>
          <div className="space-y-4">
            <p>BalDr shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our service.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">7. Changes to Terms</h2>
          <div className="space-y-4">
            <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">8. Contact Information</h2>
          <div className="space-y-4">
            <p>For questions about these Terms of Service, please contact us at:</p>
            <p>Email: legal@baldr.com</p>
            <p>Address: 123 BalDr Street, Hair City, HC 12345</p>
          </div>
        </section>
      </div>
    </div>
  )
} 