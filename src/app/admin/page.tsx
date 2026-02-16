'use client';
import { useState, useEffect } from 'react';
import { db, getAdminPassword } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Icons } from '@/components/Icons';

interface SiteData {
  contractAddress: string;
  pumpFunLink: string;
  liveStats: {
    totalFeesConverted: string;
    feesDelta24h: string;
    boostsPurchased: string;
    nextBoostProgress: number;
    nextBoostNeededLabel: string;
  };
  poll: {
    title: string;
    question: string;
    statusText: string;
    endsText: string;
    options: Array<{ id: string; label: string; votes: number }>;
  };
  stats: {
    marketCap: string;
    holders: string;
    price: string;
    volume24h: string;
    totalSupply: string;
    liquidity: string;
  };
  socials: {
    twitter: string;
    telegram: string;
    discord: string;
  };
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
      totalFeesConverted: '0.2 SOL',
      feesDelta24h: '+0.2 in last 24h',
      boostsPurchased: '40x boosts',
      nextBoostProgress: 0.2,
      nextBoostNeededLabel: '1 SOL needed',
    },
    poll: {
      title: 'FINAL RESULTS',
      question: 'DEX Update payment should come in harmony with fees, or should it not?',
      statusText: '5 votes • Final results',
      endsText: '',
      options: [
        { id: 'opt1', label: 'Christmas DEX for free', votes: 2 },
        { id: 'opt2', label: 'DEX Update from fees converted', votes: 3 },
      ],
    },
    stats: {
      marketCap: '$2.4M',
      holders: '8,420',
      price: '$0.0024',
      volume24h: '$580K',
      totalSupply: '1B',
      liquidity: '$420K',
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
  }, [authenticated]);

  const fetchSiteData = async () => {
    try {
      const docRef = doc(db, 'settings', 'site');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSiteData(docSnap.data() as SiteData);
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

  const updateStats = (key: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      stats: { ...prev.stats, [key]: value }
    }));
  };

  const updateSocials = (key: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      socials: { ...prev.socials, [key]: value }
    }));
  };

  const updateLiveStats = (key: string, value: string | number) => {
    setSiteData(prev => ({
      ...prev,
      liveStats: { ...prev.liveStats, [key]: value }
    }));
  };

  const updatePoll = (key: keyof SiteData['poll'], value: string) => {
    setSiteData(prev => ({
      ...prev,
      poll: { ...prev.poll, [key]: value }
    }));
  };

  const updatePollOption = (index: number, key: 'label' | 'votes' | 'id', value: string | number) => {
    setSiteData(prev => {
      const next = [...prev.poll.options];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, poll: { ...prev.poll, options: next } };
    });
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

        <div className="admin-group glass-card">
          <h2>Live Stats Section</h2>
          <div className="admin-field">
            <label>Total Fees Converted</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.liveStats.totalFeesConverted}
              onChange={(e) => updateLiveStats('totalFeesConverted', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Fees Delta (small text)</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.liveStats.feesDelta24h}
              onChange={(e) => updateLiveStats('feesDelta24h', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Boosts Purchased</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.liveStats.boostsPurchased}
              onChange={(e) => updateLiveStats('boostsPurchased', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Next Boost Progress (0 to 1)</label>
            <input
              type="number"
              step="0.1"
              className="admin-input"
              value={siteData.liveStats.nextBoostProgress}
              onChange={(e) => updateLiveStats('nextBoostProgress', Number(e.target.value))}
            />
          </div>
          <div className="admin-field">
            <label>Next Boost Needed Label</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.liveStats.nextBoostNeededLabel}
              onChange={(e) => updateLiveStats('nextBoostNeededLabel', e.target.value)}
            />
          </div>
        </div>

        <div className="admin-group glass-card">
          <h2>Poll Section</h2>
          <div className="admin-field">
            <label>Poll Title</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.poll.title}
              onChange={(e) => updatePoll('title', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Poll Question</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.poll.question}
              onChange={(e) => updatePoll('question', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Status Text</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.poll.statusText}
              onChange={(e) => updatePoll('statusText', e.target.value)}
            />
          </div>

          {siteData.poll.options.map((opt, idx) => (
            <div key={opt.id || idx} className="admin-field">
              <label>Option {idx + 1}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 12 }}>
                <input
                  type="text"
                  className="admin-input"
                  value={opt.label}
                  onChange={(e) => updatePollOption(idx, 'label', e.target.value)}
                />
                <input
                  type="number"
                  className="admin-input"
                  value={opt.votes}
                  onChange={(e) => updatePollOption(idx, 'votes', Number(e.target.value))}
                />
              </div>
            </div>
          ))}
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
          <h2>Token Stats</h2>
          <div className="admin-field">
            <label>Market Cap</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.stats.marketCap}
              onChange={(e) => updateStats('marketCap', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Holders</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.stats.holders}
              onChange={(e) => updateStats('holders', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Price</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.stats.price}
              onChange={(e) => updateStats('price', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>24h Volume</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.stats.volume24h}
              onChange={(e) => updateStats('volume24h', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Total Supply</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.stats.totalSupply}
              onChange={(e) => updateStats('totalSupply', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Liquidity</label>
            <input
              type="text"
              className="admin-input"
              value={siteData.stats.liquidity}
              onChange={(e) => updateStats('liquidity', e.target.value)}
            />
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
