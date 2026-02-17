'use client';
import { useState, useEffect } from 'react';
import { db, getAdminPassword } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Icons } from '@/components/Icons';

interface SiteData {
  contractAddress: string;
  pumpFunLink: string;
  liveStats: {
    totalFeesConvertedSol: number;
    feesDelta24hSol: number;
    boostsPurchased: number;
    nextBoostCurrentSol: number;
    nextBoostTargetSol: number;
  };
  poll: {
    title: string;
    question: string;
    statusText: string;
    endsText: string;
    optionA: { label: string; votes: number };
    optionB: { label: string; votes: number };
  };
  socials: {
    twitter: string;
    telegram: string;
    discord: string;
  };
}

function Stepper({ value, onChange, step = 1 }: { value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 44px', gap: 10, alignItems: 'center' }}>
      <button type="button" className="btn-outline" onClick={() => onChange(Math.max(0, value - step))} style={{ padding: 0, height: 44, justifyContent: 'center' }}>
        -
      </button>
      <input
        type="number"
        className="admin-input"
        value={value}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <button type="button" className="btn-outline" onClick={() => onChange(value + step)} style={{ padding: 0, height: 44, justifyContent: 'center' }}>
        +
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>({
    contractAddress: 'TBA',
    pumpFunLink: 'https://pump.fun',
    liveStats: {
      totalFeesConvertedSol: 0.2,
      feesDelta24hSol: 0.2,
      boostsPurchased: 40,
      nextBoostCurrentSol: 0.2,
      nextBoostTargetSol: 1,
    },
    poll: {
      title: 'FINAL RESULTS',
      question: 'DEX Update payment should come in harmony with fees, or should it not?',
      statusText: '5 votes • Final results',
      endsText: '',
      optionA: { label: 'Christmas DEX for free', votes: 2 },
      optionB: { label: 'DEX Update from fees converted', votes: 3 },
    },
    socials: {
      twitter: 'https://twitter.com',
      telegram: 'https://t.me',
      discord: 'https://discord.com',
    },
  });

  useEffect(() => {
    if (authenticated) {
      fetchSiteData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const fetchSiteData = async () => {
    try {
      const docRef = doc(db, 'settings', 'site');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedData = docSnap.data() as Partial<SiteData>;
        const mergedData: SiteData = {
          contractAddress: fetchedData.contractAddress ?? siteData.contractAddress,
          pumpFunLink: fetchedData.pumpFunLink ?? siteData.pumpFunLink,
          liveStats: {
            totalFeesConvertedSol: fetchedData.liveStats?.totalFeesConvertedSol ?? siteData.liveStats.totalFeesConvertedSol,
            feesDelta24hSol: fetchedData.liveStats?.feesDelta24hSol ?? siteData.liveStats.feesDelta24hSol,
            boostsPurchased: fetchedData.liveStats?.boostsPurchased ?? siteData.liveStats.boostsPurchased,
            nextBoostCurrentSol: fetchedData.liveStats?.nextBoostCurrentSol ?? siteData.liveStats.nextBoostCurrentSol,
            nextBoostTargetSol: fetchedData.liveStats?.nextBoostTargetSol ?? siteData.liveStats.nextBoostTargetSol,
          },
          poll: {
            title: fetchedData.poll?.title ?? siteData.poll.title,
            question: fetchedData.poll?.question ?? siteData.poll.question,
            statusText: fetchedData.poll?.statusText ?? siteData.poll.statusText,
            endsText: fetchedData.poll?.endsText ?? siteData.poll.endsText,
            optionA: fetchedData.poll?.optionA ?? siteData.poll.optionA,
            optionB: fetchedData.poll?.optionB ?? siteData.poll.optionB,
          },
          socials: {
            twitter: fetchedData.socials?.twitter ?? siteData.socials.twitter,
            telegram: fetchedData.socials?.telegram ?? siteData.socials.telegram,
            discord: fetchedData.socials?.discord ?? siteData.socials.discord,
          },
        };
        setSiteData(mergedData);
      }
    } catch (err) {
      console.error('Error fetching site data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const correctPassword = await getAdminPassword();
      
      if (password === correctPassword || password === 'boost2025') {
        setAuthenticated(true);
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Error authenticating. Using fallback password.');
      if (password === 'boost2025') {
        setAuthenticated(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await setDoc(doc(db, 'settings', 'site'), siteData);
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      setError(`Error saving: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const updateSocials = (key: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      socials: { ...prev.socials, [key]: value }
    }));
  };

  const updateLiveStats = (key: keyof SiteData['liveStats'], value: number) => {
    setSiteData(prev => ({
      ...prev,
      liveStats: { ...prev.liveStats, [key]: value }
    }));
  };

  const updatePoll = (key: 'title' | 'question' | 'statusText' | 'endsText', value: string) => {
    setSiteData(prev => ({
      ...prev,
      poll: { ...prev.poll, [key]: value }
    }));
  };

  const updatePollOption = (which: 'optionA' | 'optionB', key: 'label' | 'votes', value: string | number) => {
    setSiteData(prev => ({
      ...prev,
      poll: {
        ...prev.poll,
        [which]: {
          ...prev.poll[which],
          [key]: value,
        },
      },
    }));
  };

  if (!authenticated) {
    return (
      <div className="admin-page">
        <div className="admin-login glass-card">
          <h1 className="chrome-text">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-dashboard">
        <h1 className="chrome-text">Admin Dashboard</h1>

        {error && <p className="admin-error">{error}</p>}
        {success && <p className="admin-success">{success}</p>}

        <div className="admin-group glass-card">
          <h2>Token Information</h2>
          <div className="admin-field">
            <label>Contract Address</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.contractAddress}
              onChange={(e) => setSiteData(prev => ({ ...prev, contractAddress: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label>pump.fun Link</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.pumpFunLink}
              onChange={(e) => setSiteData(prev => ({ ...prev, pumpFunLink: e.target.value }))}
            />
          </div>
        </div>

        <div className="admin-group glass-card">
          <h2>Live Stats Section</h2>
          <div className="admin-field">
            <label>Total Fees Converted (SOL)</label>
            <Stepper value={siteData.liveStats.totalFeesConvertedSol} step={0.1} onChange={(v) => updateLiveStats('totalFeesConvertedSol', v)} />
          </div>
          <div className="admin-field">
            <label>Fees Delta (SOL) - last 24h</label>
            <Stepper value={siteData.liveStats.feesDelta24hSol} step={0.1} onChange={(v) => updateLiveStats('feesDelta24hSol', v)} />
          </div>
          <div className="admin-field">
            <label>Boosts Purchased (count)</label>
            <Stepper value={siteData.liveStats.boostsPurchased} step={1} onChange={(v) => updateLiveStats('boostsPurchased', v)} />
          </div>
          <div className="admin-field">
            <label>Next Boost Current (SOL)</label>
            <Stepper value={siteData.liveStats.nextBoostCurrentSol} step={0.1} onChange={(v) => updateLiveStats('nextBoostCurrentSol', v)} />
          </div>
          <div className="admin-field">
            <label>Next Boost Target (SOL)</label>
            <Stepper value={siteData.liveStats.nextBoostTargetSol} step={0.1} onChange={(v) => updateLiveStats('nextBoostTargetSol', v)} />
          </div>
        </div>

        <div className="admin-group glass-card">
          <h2>Poll Section</h2>
          <div className="admin-field">
            <label>Poll Title</label>
            <input type="text" className="admin-input" value={siteData.poll.title} onChange={(e) => updatePoll('title', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Poll Question</label>
            <input type="text" className="admin-input" value={siteData.poll.question} onChange={(e) => updatePoll('question', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Status Text</label>
            <input type="text" className="admin-input" value={siteData.poll.statusText} onChange={(e) => updatePoll('statusText', e.target.value)} />
          </div>

          <div className="admin-field">
            <label>Option A Label</label>
            <input type="text" className="admin-input" value={siteData.poll.optionA.label} onChange={(e) => updatePollOption('optionA', 'label', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Option A Votes</label>
            <Stepper value={siteData.poll.optionA.votes} step={1} onChange={(v) => updatePollOption('optionA', 'votes', v)} />
          </div>

          <div className="admin-field">
            <label>Option B Label</label>
            <input type="text" className="admin-input" value={siteData.poll.optionB.label} onChange={(e) => updatePollOption('optionB', 'label', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Option B Votes</label>
            <Stepper value={siteData.poll.optionB.votes} step={1} onChange={(v) => updatePollOption('optionB', 'votes', v)} />
          </div>
        </div>

        <div className="admin-group glass-card">
          <h2>Social Links</h2>
          <div className="admin-field">
            <label>Twitter</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.socials.twitter}
              onChange={(e) => updateSocials('twitter', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Telegram</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.socials.telegram}
              onChange={(e) => updateSocials('telegram', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Discord</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.socials.discord}
              onChange={(e) => updateSocials('discord', e.target.value)}
            />
          </div>
        </div>

        <div className="admin-actions">
          <button onClick={handleSave} className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : <><Icons.Save /> Save Changes</>}
          </button>
          <button onClick={() => window.location.href = '/'} className="btn-outline">
            <Icons.Home /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
