import { relations, sql } from 'drizzle-orm';
import { bigint, boolean, datetime, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core';
import { list } from './list';

export const task = mysqlTable('tasks', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  publicId: varchar('publicId', { length: 12 }).unique().notNull(),
  title: text('title').notNull(),
  isComplete: boolean('isComplete').default(false),
  completedAt: datetime('completedAt'),
  createdAt: datetime('createdAt').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updatedAt').default(sql`CURRENT_TIMESTAMP`),
  listId: bigint('listId', { mode: 'number' }).notNull(),
});

export const taskRelations = relations(task, ({ one }) => ({
  list: one(list, {
    fields: [task.listId],
    references: [list.id],
  }),
}));

export type Task = typeof task.$inferSelect;
