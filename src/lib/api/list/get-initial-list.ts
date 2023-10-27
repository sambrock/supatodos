import { cache } from 'react';
import { eq, sql } from 'drizzle-orm';
import { db } from '../../db';
import { list, task } from '../../db/schema';
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
    // columns: { id: false },
    // extras: {
    //   totalTasks: sql<number>`(select count(*) from ${task} where ${task.listId} = ${list.id})`.as('totalTasks'),
    // },
  });

  if (!data)
    return {
      errorSrc: 'db',
      error: {
        name: 'ListNotFoundError',
        message: 'List not found',
      },
    } satisfies ApiError;

  // const counts = await db.execute(
  //   // (select count(*) from ${task} where ${task.listId} = ${data.id})
  //   sql<number>`(select count(*) from ${task} where ${task.listId} = ${data.id})`
  // );

  const countTask = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(task)
    .where(eq(task.listId, data.id))
    .where(eq(task.isComplete, false));

  const countComplete = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(task)
    .where(eq(task.listId, data.id))
    .where(eq(task.isComplete, true));

  const { tasks, tags, ...initialList } = data;

  return {
    data: {
      initialList,
      initialTasks: tasks.map((task) => ({ ...task, tags: task.tags.map(({ tag }) => tag.publicId) })),
      initialTags: tags,
      initialCounts: {
        tasks: countTask[0].count,
        complete: countComplete[0].count,
      },
    },
  };
});
