"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import LiveStatsSection, { type LiveStatsData } from '@/components/LiveStatsSection';
import RoadmapSection from '@/components/RoadmapSection';
import HowToBuySection from '@/components/HowToBuySection';
import CommunitySection from '@/components/CommunitySection';
import PollSection, { type PollData } from '@/components/PollSection';
import Footer from '@/components/Footer';

type SiteData = {
  contractAddress?: string;
  pumpFunLink?: string;
  liveStats?: Partial<LiveStatsData>;
  poll?: Partial<PollData>;
  socials?: {
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
};

export default function Home() {
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const docRef = doc(db, 'settings', 'site');
        const docSnap = await getDoc(docRef);
        if (!cancelled) {
          setSiteData(docSnap.exists() ? (docSnap.data() as SiteData) : null);
        }
      } catch (error) {
        // If Firestore API is disabled/unavailable, we keep the page usable with defaults.
        console.warn('Site settings unavailable (Firestore). Using defaults.', error);
        if (!cancelled) setSiteData(null);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <LiveStatsSection liveStats={siteData?.liveStats} />
        <PollSection poll={siteData?.poll} />
        <RoadmapSection />
        <HowToBuySection contractAddress={siteData?.contractAddress || 'TBA'} />
        <CommunitySection socials={siteData?.socials} />
      </main>
      <Footer />
    </>
  );
}
