import { cache } from 'react';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { list } from '../db/schema';
import type { Api } from './api.types';

export const getInitialListData = cache(async (publicId: string) => {
  const data = await db.query.list.findFirst({
    where: eq(list.publicId, publicId),
    with: {
      tasks: {
        limit: 50,
        columns: { id: false },
      },
    },
    columns: { id: false },
  });

  if (!data)
    return {
      success: false,
      error: {
        name: 'ListNotFoundError',
        message: 'List not found',
      },
    };

  const { tasks, ...initialList } = data;

  return {
    success: true,
    data: {
      initialList,
      initialTasks: tasks,
    },
  };
}) satisfies Api;
