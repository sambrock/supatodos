'use client';

import { Task } from '@/lib/db/schema';

type Props = {
  task: Omit<Task, 'id'>;
};

export const ListTask = ({ task }: Props) => {
  return (
    <div key={task.id} className="flex gap-1 items-center">
      <input type="checkbox" checked={task.isComplete ?? false} onChange={(e) => console.log('check')} />
      <span>{task.title}</span>
    </div>
  );
};
