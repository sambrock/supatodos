'use client';

import { Task as TaskSchema } from '@/lib/db/schema';
import { useListStore } from '@/store/store';
import { Task } from '../task/Task';

type Props = {
  initialTasks: TaskSchema[];
};

export const List = ({ initialTasks }: Props) => {
  const tasks = useListStore((state) => (state.data.tasks ? [...state.data.tasks?.values()] : initialTasks));

  return (
    <div>
      <ul className="my-4 grid grid-cols-1 gap-1">
        {tasks.map((task, index) => (
          <Task key={index} initialTask={task} />
        ))}
      </ul>
    </div>
  );
};
