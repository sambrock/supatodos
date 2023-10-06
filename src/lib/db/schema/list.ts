import { relations, sql } from 'drizzle-orm';
import {
  bigint,
  datetime,
  mysqlTable,
  text,
  varchar,
} from 'drizzle-orm/mysql-core';
import { task } from './task';

export const list = mysqlTable('lists', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  publicId: varchar('publicId', { length: 12 }).unique().notNull(),
  title: text('title'),
  createdAt: datetime('createdAt').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updatedAt').default(sql`CURRENT_TIMESTAMP`),
});

export const listRelations = relations(list, ({ many }) => ({
  tasks: many(task),
}));
