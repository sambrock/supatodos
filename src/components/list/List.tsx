'use client';

import { Task as TaskSchema } from '@/lib/db/schema';
import { useListStore } from '@/store/store';
import { Task } from '../task/Task';

type Props = {
  initialTasks: TaskSchema[];
};

export const List = ({ initialTasks }: Props) => {
  const tasks = useListStore((state) =>
    state.data.tasks ? [...state.data.tasks?.values()].sort((a, b) => b.index - a.index) : initialTasks
  );

  return (
    <div>
      <ul className="grid grid-cols-1 gap-1 gap-x-3">
        {tasks.map((task, index) => (
          <Task key={index} initialTask={task} />
        ))}
      </ul>
    </div>
  );
};
