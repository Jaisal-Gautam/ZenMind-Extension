export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-zen-ink">
      <h1 className="font-display text-4xl mb-2 text-zen-deep">Terms of Service</h1>
      <p className="text-zen-muted mb-10">Last updated: August 1, 2026</p>
      
      <div className="space-y-8 text-[16px] leading-relaxed text-zen-ink/80">
        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Acceptance of Terms</h2>
          <p className="mb-3">By accessing ZenMind or using the ZenMind browser extension, you agree to these Terms of Service.</p>
          <p>If you do not agree, please do not use the service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Use of ZenMind</h2>
          <p className="mb-2">You agree to use ZenMind only for lawful purposes.</p>
          <p className="mb-2">You may not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Attempt to interfere with the service</li>
            <li>Reverse engineer the application except where permitted by law</li>
            <li>Abuse or exploit the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Accounts</h2>
          <p className="mb-3">You are responsible for maintaining the security of your account credentials.</p>
          <p>You are responsible for all activity occurring under your account.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Intellectual Property</h2>
          <p>ZenMind, including its branding, source code (except open-source components), design, and content, is the intellectual property of ZenMind.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Availability</h2>
          <p className="mb-3">We strive to keep ZenMind available at all times but do not guarantee uninterrupted service.</p>
          <p>Features may change, be modified, or be discontinued without notice.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Disclaimer</h2>
          <p className="mb-3">ZenMind is provided "as is" without warranties of any kind.</p>
          <p>We do not guarantee that the service will always be error-free or uninterrupted.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, ZenMind shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from the use of the service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Changes to These Terms</h2>
          <p className="mb-3">We may update these Terms periodically.</p>
          <p>Continued use of ZenMind after changes become effective constitutes acceptance of the revised Terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-zen-deep mb-3">Contact</h2>
          <p><a href="mailto:jaisal@zen-mind.dev" className="text-zen-forest hover:text-zen-accent transition-colors font-medium">jaisal@zen-mind.dev</a></p>
        </section>
      </div>
    </div>
  );
}
