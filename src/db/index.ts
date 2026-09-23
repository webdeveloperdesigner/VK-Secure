import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';

// Mock fallback for build/development if DATABASE_URL is not yet set
const sql = neon(connectionString || 'postgres://placeholder:placeholder@localhost:5432/placeholder');

export const db = drizzle(sql, { schema });
