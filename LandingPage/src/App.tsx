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

function App() {
  return (
    <div className="min-h-screen bg-zen-cream">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FocusModes />
      <WebsiteBlocking />
      <Soundscapes />
      <Insights />
      <Pricing />
      <FinalCta />
      <Footer />
    </div>
  );
}

export default App;
