'use client';

import { Task } from '@/lib/db/schema';
import { useListStore } from '@/store/list/store';

type Props = {
  index: number;
  initialTask: Omit<Task, 'id'>;
};

const dispatch = useListStore.getState().dispatch;

export const ListTask = ({ initialTask, index }: Props) => {
  const task = useListStore((state) => state.data.tasks?.get(index) ?? initialTask);

  return (
    <div className="flex gap-1 items-center">
      <input type="checkbox" checked={task.isComplete ?? false} onChange={(e) => console.log('check')} />
      <input
        className="bg-neutral-800"
        type="text"
        value={task.title}
        onChange={(e) =>
          dispatch({
            type: 'UPDATE_TASK',
            payload: {
              index,
              title: e.target.value,
            },
          })
        }
      />
    </div>
  );
};
