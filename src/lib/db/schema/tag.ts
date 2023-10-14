import { relations } from 'drizzle-orm';
import { bigint, mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core';
import { task } from './task';
import { list } from './list';

export const tag = mysqlTable('tags', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  publicId: varchar('publicId', { length: 12 }).unique().notNull(),
  name: varchar('name', { length: 255 }).default('').notNull(),
  color: varchar('color', { length: 20 }).default('neutral').notNull(),
  listId: bigint('listId', { mode: 'number' }).notNull(),
});

export type Tag = Omit<typeof tag.$inferSelect, 'id' | 'listId'>;

export const tagRelations = relations(tag, ({ one, many }) => ({
  list: one(list, {
    fields: [tag.listId],
    references: [list.id],
  }),
  tasks: many(tagsToTasks),
}));

export const tagsToTasks = mysqlTable(
  'tags_to_tasks',
  {
    tagId: bigint('tagId', { mode: 'number' })
      .notNull()
      .references(() => tag.id),
    taskId: bigint('taskId', { mode: 'number' })
      .notNull()
      .references(() => task.id),
  },
  (t) => ({
    pk: primaryKey(t.tagId, t.taskId),
  })
);

export const tagsToTasksRelations = relations(tagsToTasks, ({ one }) => ({
  task: one(task, {
    fields: [tagsToTasks.taskId],
    references: [task.id],
  }),
  tag: one(tag, {
    fields: [tagsToTasks.tagId],
    references: [tag.id],
  }),
}));
