export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-zen-ink">
      <h1 className="font-display text-4xl mb-2 text-zen-deep">Privacy Policy</h1>
      <p className="text-zen-muted mb-10">Last updated: August 1, 2026</p>
      
      <div className="space-y-8 text-[16px] leading-relaxed text-zen-ink/80">
        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Introduction</h2>
          <p className="mb-3">ZenMind ("we", "our", or "us") is a browser extension designed to help users stay focused by blocking distracting websites, managing focus sessions, and providing productivity analytics.</p>
          <p>This Privacy Policy explains what information we collect, how we use it, and how we protect it.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Information We Collect</h2>
          <p className="mb-4">ZenMind only collects the information necessary to provide its features.</p>
          
          <h3 className="text-lg font-medium text-zen-deep mb-2 mt-6">Account Information</h3>
          <p className="mb-2">When you create an account, we collect:</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Username</li>
            <li>Email address</li>
            <li>Password (stored securely as a one-way hash)</li>
          </ul>

          <h3 className="text-lg font-medium text-zen-deep mb-2 mt-6">Productivity Data</h3>
          <p className="mb-2">To provide analytics and focus tracking, ZenMind stores information such as:</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Focus session duration</li>
            <li>Website session durations</li>
            <li>Blocked website attempts</li>
            <li>User preferences</li>
            <li>Time zone</li>
          </ul>
          <p className="mb-4">We do not store the contents of webpages you visit.</p>

          <h3 className="text-lg font-medium text-zen-deep mb-2 mt-6">Technical Information</h3>
          <p className="mb-2">We may collect:</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Browser time zone</li>
            <li>Extension version</li>
            <li>Basic error logs for debugging (if applicable)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">What We Do NOT Collect</h2>
          <p className="mb-2">ZenMind does not collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Passwords in plain text</li>
            <li>Credit card information</li>
            <li>Personal documents</li>
            <li>Keystrokes</li>
            <li>Browsing history beyond the information required for website blocking and productivity statistics</li>
            <li>The contents of webpages</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">How We Use Your Information</h2>
          <p className="mb-2">We use your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Authenticate your account</li>
            <li>Synchronize your settings</li>
            <li>Save focus sessions</li>
            <li>Generate productivity analytics</li>
            <li>Improve ZenMind</li>
            <li>Respond to support requests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Data Sharing</h2>
          <p className="mb-3">We do not sell, rent, or trade your personal information.</p>
          <p className="mb-2">We only share data when:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Required by law</li>
            <li>Necessary to operate our infrastructure (such as hosting providers)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Data Security</h2>
          <p className="mb-2">We use industry-standard security measures, including:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>HTTPS encryption</li>
            <li>Password hashing</li>
            <li>Authentication tokens</li>
            <li>Secure cloud infrastructure</li>
          </ul>
          <p>While no online service is completely secure, we take reasonable measures to protect your information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Data Retention</h2>
          <p className="mb-3">We retain your information for as long as your account remains active.</p>
          <p>You may request account deletion by contacting us.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Your Rights</h2>
          <p className="mb-2">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access your data</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account</li>
            <li>Request a copy of your stored information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Contact</h2>
          <p>Email: <a href="mailto:jaisal@zen-mind.dev" className="text-zen-forest hover:text-zen-accent transition-colors font-medium">jaisal@zen-mind.dev</a></p>
        </section>
      </div>
    </div>
  );
}
