import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import RoadmapSection from '@/components/RoadmapSection';
import HowToBuySection from '@/components/HowToBuySection';
import CommunitySection from '@/components/CommunitySection';
import Footer from '@/components/Footer';

async function getSiteData() {
  try {
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching site data:', error);
    return null;
  }
}

export default async function Home() {
  const siteData = await getSiteData();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection stats={siteData?.stats} />
        <RoadmapSection />
        <HowToBuySection contractAddress={siteData?.contractAddress || 'TBA'} />
        <CommunitySection socials={siteData?.socials} />
      </main>
      <Footer />
    </>
  );
}
