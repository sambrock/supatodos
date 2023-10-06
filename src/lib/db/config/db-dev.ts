import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from '../schema';

const connection = await mysql.createConnection({
  host: process.env['DATABASE_HOST'],
  user: process.env['DATABASE_USER'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
});

export const DEV_DB = drizzle(connection, { schema, mode: 'default' });
