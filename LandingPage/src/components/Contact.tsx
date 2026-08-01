export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-zen-ink">
      <h1 className="font-display text-4xl mb-4 text-zen-deep">Contact</h1>
      <p className="text-zen-muted mb-10 text-lg">Questions, feedback, bug reports, or feature requests are always welcome.</p>

      <div className="bg-white/80 border  border-zen-sage/70 rounded-3xl p-8 shadow-sm">
        <div className="space-y-8">
          <div>
            <h3 className="text-[13px] font-medium text-zen-muted uppercase tracking-wider mb-2">Email</h3>
            <a href="mailto:jaisal@zen-mind.dev" className="text-lg text-zen-forest hover:text-zen-accent transition-colors font-medium">jaisal@zen-mind.dev</a>
          </div>
          <div>
            <h3 className="text-[13px] font-medium text-zen-muted uppercase tracking-wider mb-2">X (Twitter)</h3>
            <a href="https://x.com/jaisal_tech" target="_blank" rel="noopener noreferrer" className="text-lg text-zen-forest hover:text-zen-accent transition-colors font-medium">@jaisal_tech</a>
          </div>
          <div className="pt-4 border-t border-zen-sage/30">
            <h3 className="text-[13px] font-medium text-zen-muted uppercase tracking-wider mb-2">Response Time</h3>
            <p className="text-zen-ink/80">We typically respond within 24–48 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
