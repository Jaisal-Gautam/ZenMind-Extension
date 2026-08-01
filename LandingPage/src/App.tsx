import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FocusModes from '@/components/FocusModes';
import WebsiteBlocking from '@/components/WebsiteBlocking';
import Soundscapes from '@/components/Soundscapes';
import Insights from '@/components/Insights';
import Pricing from '@/components/Pricing';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import Privacy from '@/components/Privacy';
import Terms from '@/components/Terms';
import Contact from '@/components/Contact';

function App() {
  const path = window.location.pathname;

  let content;
  if (path === '/privacy') {
    content = <Privacy />;
  } else if (path === '/terms') {
    content = <Terms />;
  } else if (path === '/contact') {
    content = <Contact />;
  } else {
    content = (
      <main>
        <Hero />
        <HowItWorks />
        <FocusModes />
        <WebsiteBlocking />
        <Soundscapes />
        <Insights />
        <Pricing />
        <FinalCta />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-zen-cream">
      <Navbar />
      {content}
      <Footer />
      <Analytics/>
    </div>
  );
}

export default App;
