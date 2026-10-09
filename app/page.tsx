import ComingSoonProvider from "@/components/comingSoon/ComingSoonProvider";
import ContactProvider from "@/components/contact/ContactProvider";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ForMotari from "@/components/ForMotari";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Inclusion from "@/components/Inclusion";
import ScrollEffects from "@/components/motion/ScrollEffects";
import StructuredData from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <ContactProvider>
      <ComingSoonProvider>
        <StructuredData />
        <ScrollEffects />
        <Header />
        <main>
          <Hero />
          <HowItWorks />
          <Inclusion />
          <ForMotari />
          <Faq />
          <Cta />
        </main>
        <Footer />
      </ComingSoonProvider>
    </ContactProvider>
  );
}
