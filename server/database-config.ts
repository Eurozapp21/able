import { drizzle } from 'drizzle-orm/postgres-js';
import { drizzle as drizzleMySQL } from 'drizzle-orm/mysql2';
import postgres from 'postgres';
import mysql from 'mysql2/promise';
import * as schema from '../shared/schema';

// Database configuration for shared hosting deployment
export function createDatabaseConnection() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required');
  }
  
  // Check if it's a PostgreSQL connection
  if (databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://')) {
    const client = postgres(databaseUrl, {
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    
    return drizzle(client, { schema });
  }
  
  // Check if it's a MySQL connection
  if (databaseUrl.startsWith('mysql://')) {
    const connection = mysql.createPool({
      uri: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      connectionLimit: 10,
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true,
    });
    
    return drizzleMySQL(connection, { schema, mode: 'default' });
  }
  
  throw new Error('Unsupported database URL format. Use postgresql:// or mysql://');
}

// Database initialization for shared hosting
export async function initializeDatabase() {
  const db = createDatabaseConnection();
  
  try {
    // Test the connection
    await db.execute('SELECT 1');
    console.log('Database connection established successfully');
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// Production database storage class
export class ProductionStorage {
  private db: ReturnType<typeof createDatabaseConnection>;
  
  constructor() {
    this.db = createDatabaseConnection();
  }
  
  async initialize() {
    try {
      await this.db.execute('SELECT 1');
      console.log('Production database initialized');
    } catch (error) {
      console.error('Failed to initialize production database:', error);
      throw error;
    }
  }
  
  // Add all the storage methods here that match IStorage interface
  // This would replace the in-memory storage for production deployment
}