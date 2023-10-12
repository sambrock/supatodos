import { relations } from 'drizzle-orm';
import { mysqlTable, text, tinyint } from 'drizzle-orm/mysql-core';
import { task } from './task';

export const priority = mysqlTable('priorities', {
  id: tinyint('id').primaryKey().autoincrement(),
  name: text('name').default('').notNull(),
  level: tinyint('level').notNull(),
});

export const priorityRelations = relations(priority, ({ many }) => ({
  tasks: many(task),
}));

export type Priority = typeof priority.$inferSelect;
