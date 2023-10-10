'use client';

import type { Task } from '@/lib/db/schema';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/list/store';

type Props = {
  index: number;
  initialTask: Omit<Task, 'id'>;
};

const dispatch = useListStore.getState().dispatch;

export const EditTask = ({ index, initialTask }: Props) => {
  const task = useListStore((state) => state.data.tasks?.get(index) ?? initialTask);

  return (
    <li className={cx('flex space-x-3 px-3 py-2 text-md rounded-lg items-center bg-black/5 max-w-md')}>
      <input
        type="checkbox"
        checked={task.isComplete}
        onChange={(e) => {
          dispatch({
            type: 'UPDATE_TASK',
            payload: {
              index,
              isComplete: e.target.checked,
            },
          });
        }}
      />
      <span>{task.title}</span>
    </li>
  );
};
