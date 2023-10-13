import { cache } from 'react';
import { Api } from './api.types';
import { db } from '../db';

export const revalidate = 'force-cache';

export const getPriorities = cache(async () => {
  const data = await db.query.priority.findMany();

  return {
    success: true,
    data,
  };
}) satisfies Api;
