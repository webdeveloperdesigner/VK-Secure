import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// 1. Users table (Centralized Identity)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // e.g. "usr_8f92a11b"
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  name: text('name').notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  status: text('status').default('ACTIVE').notNull(), // ACTIVE, SUSPENDED
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. Client Applications (BodhAI, VEDA, Invoice, RapidHost)
export const applications = pgTable('applications', {
  id: text('id').primaryKey(), // e.g. "vk_app_bodhai"
  name: text('name').notNull(),
  clientId: text('client_id').notNull().unique(),
  clientSecretHash: text('client_secret_hash').notNull(),
  redirectUris: text('redirect_uris').notNull(), // JSON string array
  allowedOrigins: text('allowed_origins').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. User Sessions
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(), // e.g. "sess_99a812bc"
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  refreshTokenHash: text('refresh_token_hash').notNull(),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Audit Log (Security Events)
export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  event: text('event').notNull(), // e.g. "user.login.success", "user.register"
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
