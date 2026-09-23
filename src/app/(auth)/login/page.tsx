'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <ShieldCheck size={48} color="#06b6d4" style={{ margin: '0 auto 12px auto' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>VK Account</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Sign in to continue to VK Ecosystem</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {result ? (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '16px', borderRadius: '8px', fontSize: '14px' }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Authentication Successful!</h4>
            <p><strong>User ID:</strong> {result.user.id}</p>
            <p style={{ wordBreak: 'break-all', marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
              <strong>Access Token:</strong> {result.access_token}
            </p>
            <button onClick={() => setResult(null)} className="glow-btn" style={{ width: '100%', marginTop: '16px' }}>Back to Login</button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="glow-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#94a3b8' }}>
          <Link href="/" style={{ color: '#06b6d4' }}>← Back to VK Auth Home</Link>
        </div>
      </div>
    </div>
  );
}
