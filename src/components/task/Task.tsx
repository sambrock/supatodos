'use client';

import type { Task as TaskSchema } from '@/lib/db/schema';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/list/store';
import { TaskCheck } from './TaskCheck';
import { Clock } from 'lucide-react';

type Props = {
  index: number;
  initialTask: Omit<TaskSchema, 'id'>;
};

const dispatch = useListStore.getState().dispatch;

export const Task = ({ index, initialTask }: Props) => {
  const task = useListStore((state) => state.data.tasks?.get(index) ?? initialTask);

  return (
    <li className={cx('flex space-x-3 px-3 py-3 hover:bg-[#ffffff04] text-sm rounded-lg items-center')}>
      <TaskCheck
        isComplete={task.isComplete ?? false}
        onCheckedChange={(checked) => {
          dispatch({
            type: 'UPDATE_TASK',
            payload: {
              index,
              isComplete: Boolean(checked.valueOf()),
            },
          });
        }}
      />
      <div className={cx('w-full max-w-sm')}>
        <span
          className={cx({
            'line-through text-white/20': task.isComplete,
          })}
        >
          {task.title}
        </span>
      </div>
      <span
        className={cx('font-medium ml-3', {
          'text-red-500': !task.isComplete,
          'text-white/20': task.isComplete,
        })}
      >
        !!
      </span>
    </li>
  );
};
