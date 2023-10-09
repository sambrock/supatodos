'use client';

import { useListStore } from '@/store/list/store';
import { ListTask } from './ListTask';

export const TaskList = () => {
  const tasks = useListStore((state) => [...(state.data.tasks?.values() || [])]);

  return (
    <div>
      {tasks?.map((task, index) => (
        <ListTask key={task.publicId} initialTask={task} index={index} />
      ))}
    </div>
  );
};
