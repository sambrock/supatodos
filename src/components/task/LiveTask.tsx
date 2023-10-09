'use client';

import type { Task } from '@/lib/db/schema';

type Props = {
  initialTask: Omit<Task, 'id'>;
};

export const LiveTask = ({ initialTask }: Props) => {
  return initialTask.title;
};
