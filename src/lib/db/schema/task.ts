import { relations, sql } from 'drizzle-orm';
import { bigint, boolean, datetime, mysqlTable, text, tinyint, varchar } from 'drizzle-orm/mysql-core';
import { list } from './list';
import { type Tag, tagsToTasks } from './tag';

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
  priorityLevel: tinyint('priorityLevel').notNull().default(1),
});

export const taskRelations = relations(task, ({ one, many }) => ({
  list: one(list, {
    fields: [task.listId],
    references: [list.id],
  }),
  tags: many(tagsToTasks),
}));

export type Task = Omit<typeof task.$inferSelect, 'id' | 'listId'>;
export type TaskWithRelations = Task & { tags: string[] };
