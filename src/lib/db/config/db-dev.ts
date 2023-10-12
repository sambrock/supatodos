import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from '../schema';
import { DEV_DB_CONFIG } from './db-config';

export const poolConnection = mysql.createPool(DEV_DB_CONFIG);

export const DEV_DB = drizzle(poolConnection, { schema, mode: 'default' });
