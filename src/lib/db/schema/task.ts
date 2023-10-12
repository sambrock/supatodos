import { relations, sql } from 'drizzle-orm';
import { bigint, boolean, datetime, mysqlTable, text, tinyint, varchar } from 'drizzle-orm/mysql-core';
import { list } from './list';
import { priority } from './priority';

export const task = mysqlTable('tasks', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  publicId: varchar('publicId', { length: 12 }).unique().notNull(),
  title: text('title').default('').notNull(),
  isComplete: boolean('isComplete').default(false).notNull(),
  completedAt: datetime('completedAt'),
  createdAt: datetime('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: datetime('updatedAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  listId: bigint('listId', { mode: 'number' }).notNull(),
  priorityId: tinyint('priorityId').notNull().default(1),
});

export const taskRelations = relations(task, ({ one }) => ({
  list: one(list, {
    fields: [task.listId],
    references: [list.id],
  }),
  priority: one(priority, {
    fields: [task.priorityId],
    references: [priority.id],
  }),
}));

export type Task = typeof task.$inferSelect;
