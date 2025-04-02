export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Information We Collect</h2>
          <div className="space-y-4">
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Hair care preferences and history</li>
              <li>Photos and progress updates</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">How We Use Your Information</h2>
          <div className="space-y-4">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you updates and marketing communications</li>
              <li>Improve our AI-powered recommendations</li>
              <li>Respond to your requests and support needs</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Information Sharing</h2>
          <div className="space-y-4">
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Payment processors for transaction processing</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Data Security</h2>
          <div className="space-y-4">
            <p>We implement appropriate security measures to protect your personal information, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage and transmission</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Your Rights</h2>
          <div className="space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-baldr-yellow">Contact Us</h2>
          <div className="space-y-4">
            <p>For privacy-related questions or concerns, please contact us at:</p>
            <p>Email: privacy@baldr.com</p>
            <p>Address: 123 BalDr Street, Hair City, HC 12345</p>
          </div>
        </section>
      </div>
    </div>
  )
} 