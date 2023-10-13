import { relations, sql } from 'drizzle-orm';
import { bigint, datetime, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core';
import { Task, task } from './task';
import { tag } from './tag';

export const list = mysqlTable('lists', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  publicId: varchar('publicId', { length: 12 }).unique().notNull(),
  name: text('name').notNull().default(''),
  createdAt: datetime('createdAt').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updatedAt').default(sql`CURRENT_TIMESTAMP`),
});

export const listRelations = relations(list, ({ many }) => ({
  tasks: many(task),
  tags: many(tag),
}));

export type List = Omit<typeof list.$inferSelect, 'id'>;
export type ListWithRelations = List & { tasks: Task[] };
