import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/lib/db/schema/*',
  driver: 'mysql2',
  dbCredentials: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'supatodos',
  },
} satisfies Config;
