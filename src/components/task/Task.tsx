'use client';

import type { TaskWithRelations } from '@/lib/db/schema';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/list/store';
import { TaskCheck } from './TaskCheck';
import { TaskPriority } from './TaskPriority';
import { TaskTag } from './TaskTag';

type Props = {
  index: number;
  initialTask: TaskWithRelations;
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
      <div className={cx('w-full max-w-sm flex')}>
        <TaskPriority className="mr-2" priority={task.priority} />
        <span
          className={cx({
            'line-through text-white/20': task.isComplete,
          })}
        >
          {task.name}
        </span>
      </div>
      <ul>{task.tags?.map((tag, index) => <TaskTag key={index} tag={tag} />)}</ul>
    </li>
  );
};
