import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { priority } from './schema/priority';
import { DEV_DB_CONFIG } from './config/db-config';

dotenv.config({ path: '.env' });

const main = async () => {
  const poolConnection = mysql.createPool(DEV_DB_CONFIG);

  const db = drizzle(poolConnection);

  await db.insert(priority).values([
    { name: 'Normal', level: 1, id: 1 },
    { name: 'Low', level: 2, id: 2 },
    { name: 'High', level: 3, id: 3 },
  ]);
  console.log('Seed done');
};

main();
