import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { hashPassword, verifyPassword } from '../lib/password';
import { createAccessToken, verifyAccessToken } from '../lib/jwt';

const app = new Hono().basePath('/api/v1');

// Global CORS Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health Check
app.get('/health', (c) => c.json({ status: 'ok', service: 'VK Auth Engine', timestamp: new Date().toISOString() }));

// Register Identity
app.post('/auth/register', async (c) => {
  try {
    const { name, email, password } = await c.req.json();
    if (!name || !email || !password) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const hashedPassword = await hashPassword(password);
    const userId = `usr_${Math.random().toString(36).substring(2, 10)}`;

    // Generate Access Token
    const accessToken = await createAccessToken({ sub: userId, email, name });

    return c.json({
      success: true,
      user: { id: userId, name, email, emailVerified: false },
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 900,
    });
  } catch (err: any) {
    return c.json({ error: 'Failed to process registration', details: err.message }, 500);
  }
});

// Login Identity
app.post('/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    const mockUserId = `usr_${Math.random().toString(36).substring(2, 10)}`;
    const accessToken = await createAccessToken({ sub: mockUserId, email, name: 'VK User' });

    return c.json({
      success: true,
      user: { id: mockUserId, email, name: 'VK User' },
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 900,
      refresh_token: `ref_${Math.random().toString(36).substring(2, 15)}`,
    });
  } catch (err: any) {
    return c.json({ error: 'Authentication failed', details: err.message }, 500);
  }
});

// Token Verification / Me
app.get('/auth/me', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing Bearer Token' }, 401);
  }

  const token = authHeader.split(' ')[1];
  const verified = await verifyAccessToken(token);

  if (!verified) {
    return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
  }

  return c.json({
    authenticated: true,
    user: verified.payload,
  });
});

export default app;
