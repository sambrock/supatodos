import { cache } from 'react';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { list } from '../db/schema';
import type { Api } from './api.types';

export const getInitialListData = cache(async (publicId: string) => {
  const data = await db.query.list.findFirst({
    where: eq(list.publicId, publicId),
    with: {
      tags: {
        columns: { id: false, listId: false },
      },
      tasks: {
        limit: 50,
        columns: { id: false },
        with: {
          tags: {
            columns: { taskId: false, tagId: false },
            with: {
              tag: {
                columns: { id: false, listId: false, publicId: true },
              },
            },
          },
        },
      },
    },
    columns: { id: false },
    // extras: {
    //   tasksSize: sql<number>`length(${tag.id})`.as('tasks_size'),
    // },
  });

  if (!data)
    return {
      success: false,
      error: {
        name: 'ListNotFoundError',
        message: 'List not found',
      },
    };

  const { tasks, tags, ...initialList } = data;

  return {
    success: true,
    data: {
      initialList,
      initialTasks: tasks.map((task) => ({ ...task, tags: task.tags.map(({ tag }) => tag.publicId) })),
      initialTags: tags,
    },
  };
}) satisfies Api;
