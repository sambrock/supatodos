'use client';

import type { Task as _Task } from '@/lib/db/schema';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/store';
import { TaskCheck } from './TaskCheck';
import { TaskPriority } from './TaskPriority';
import { MoreHorizontal } from 'lucide-react';
import { useHover } from 'usehooks-ts';
import { useRef } from 'react';

type Props = {
  initialTask: _Task;
};

const dispatch = useListStore.getState().dispatch;

export const Task = ({ initialTask }: Props) => {
  const task = useListStore((state) => state.data.tasks?.get(initialTask.publicId) ?? initialTask);

  const liRef = useRef<HTMLLIElement>(null);
  const hover = useHover(liRef);

  return (
    <li ref={liRef} className={cx('flex space-x-3 px-3 py-3 hover:bg-neutral-800/20 text-sm rounded-lg items-center')}>
      <TaskCheck
        isComplete={task.isComplete ?? false}
        onCheckedChange={(checked) => {
          dispatch({
            type: 'UPDATE_TASK',
            payload: {
              publicId: initialTask.publicId,
              updates: {
                isComplete: Boolean(checked.valueOf()),
              },
            },
          });
        }}
      />
      <div className={cx('w-full flex items-center')}>
        <TaskPriority className="mr-2" priorityLevel={task.priorityLevel} isComplete={task.isComplete} />
        <span
          className={cx({
            'line-through text-white/20': task.isComplete,
          })}
        >
          {task.title}
        </span>
      </div>
      <div className={cx('ml-auto', hover ? 'visible' : 'invisible')}>
        <MoreHorizontal className="text-xs h-4 w-6 text-neutral-500 leading-none" />
      </div>
    </li>
  );
};
