import '../styles/globals.css';
import Link from 'next/link';
import { ShieldCheck, Cpu, Lock, Layers, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Nav */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: 'bold' }}>
          <ShieldCheck size={32} color="#06b6d4" />
          <span>VK <span style={{ color: '#06b6d4' }}>Auth</span></span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/login" className="glow-btn">Sign In</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', margin: '60px 0 100px 0' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 16px', 
          borderRadius: '30px', 
          background: 'rgba(6, 182, 212, 0.1)', 
          border: '1px solid rgba(6, 182, 212, 0.3)',
          color: '#06b6d4',
          marginBottom: '24px',
          fontSize: '14px'
        }}>
          <Zap size={16} /> Enterprise Identity Platform
        </div>
        <h1 style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px' }}>
          One Identity. <br />
          <span style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Every VK Project.
          </span>
        </h1>
        <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 40px auto' }}>
          Centralized authentication powering BodhAI, MilkLedger, Invoice System, RapidHost, and future VK applications.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/login" className="glow-btn" style={{ padding: '16px 36px', fontSize: '18px' }}>Launch Auth Portal</Link>
          <a href="/api/v1/health" target="_blank" className="glass-panel" style={{ padding: '16px 36px', fontSize: '18px', color: '#fff' }}>Check API Status</a>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <Lock size={32} color="#2563eb" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Single Sign-On (SSO)</h3>
          <p style={{ color: '#94a3b8' }}>Login once and access all VK products without re-entering credentials.</p>
        </div>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <Cpu size={32} color="#06b6d4" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Decoupled DB Architecture</h3>
          <p style={{ color: '#94a3b8' }}>Applications keep their own databases (MongoDB, PostgreSQL, Firebase) while sharing identity.</p>
        </div>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <Layers size={32} color="#10b981" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>VK Secure Guard</h3>
          <p style={{ color: '#94a3b8' }}>Argon2id password hashing, OAuth2 + PKCE flow, and active device session management.</p>
        </div>
      </section>
    </div>
  );
}
