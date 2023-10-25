import { cache } from 'react';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { list } from '../../db/schema';
import type { ApiError } from '../api.types';

export const getInitialList = cache(async (publicId: string) => {
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
  });

  if (!data)
    return {
      errorSrc: 'db',
      error: {
        name: 'ListNotFoundError',
        message: 'List not found',
      },
    } satisfies ApiError;

  const { tasks, tags, ...initialList } = data;

  return {
    data: {
      initialList,
      initialTasks: tasks.map((task) => ({ ...task, tags: task.tags.map(({ tag }) => tag.publicId) })),
      initialTags: tags,
    },
  };
});