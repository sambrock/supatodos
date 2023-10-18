'use client';

import type { Task as _Task } from '@/lib/db/schema';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/store';
import { TaskCheck } from './TaskCheck';
import { TaskPriority } from './TaskPriority';

type Props = {
  initialTask: _Task;
};

const dispatch = useListStore.getState().dispatch;

export const Task = ({ initialTask }: Props) => {
  const task = useListStore((state) => state.data.tasks?.get(initialTask.publicId) ?? initialTask);

  return (
    <li className={cx('flex space-x-3 px-3 py-3 hover:bg-[#ffffff04] text-sm rounded-lg items-center')}>
      <TaskCheck
        isComplete={task.isComplete ?? false}
        onCheckedChange={(checked) => {
          dispatch({
            type: 'UPDATE_TASK',
            payload: {
              publicId: initialTask.publicId,
              updates: {
                title: 'Completed!!',
                isComplete: Boolean(checked.valueOf()),
              },
            },
          });
        }}
      />
      <div className={cx('w-full max-w-sm flex')}>
        <TaskPriority className="mr-2" priorityLevel={task.priorityLevel} />
        <span
          className={cx({
            'line-through text-white/20': task.isComplete,
          })}
        >
          {task.title}
        </span>
      </div>
    </li>
  );
};
