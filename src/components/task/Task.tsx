'use client';

import { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import { MoreHorizontal, X } from 'lucide-react';
import type { Task as _Task } from '@/lib/db/schema';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/store';
import { TaskCheck } from './TaskCheck';
import { TaskPriority } from './TaskPriority';
import { TaskTitle } from './TaskTitle';
import { TaskTitleStatic } from './TaskTitleStatic';
import { ButtonIcon } from '../common/ButtonIcon';

type Props = {
  initialTask: _Task;
};

const dispatch = useListStore.getState().dispatch;

export const Task = ({ initialTask }: Props) => {
  const task = useListStore((state) => state.data.tasks?.get(initialTask.publicId) ?? initialTask);

  const liRef = useRef<HTMLLIElement>(null);
  const hover = useHover(liRef);

  return (
    <li
      ref={liRef}
      className={cx('group relative flex space-x-3 px-3 py-3 hover:bg-neutral-800/50 text-sm rounded-md items-center')}
    >
      <TaskCheck
        isComplete={task.isComplete ?? false}
        onCheckedChange={(checked) => {
          dispatch({
            type: 'UPDATE_TASK',
            payload: {
              publicId: initialTask.publicId,
              updates: { isComplete: Boolean(checked.valueOf()) },
            },
          });
        }}
      />
      <div className={cx('w-full flex items-center')}>
        <TaskPriority className="mr-2" priorityLevel={task.priorityLevel} isComplete={task.isComplete} />
        {!task.isComplete ? (
          <TaskTitle initialTitle={task.title} publicId={initialTask.publicId} />
        ) : (
          <TaskTitleStatic title={task.title} isComplete={task.isComplete} />
        )}
      </div>
      <div className={cx('flex items-center space-x-1 absolute right-3', hover ? 'visible' : 'invisible')}>
        <ButtonIcon
          variant="transparent"
          size="small"
          icon={<X className="h-3.5 w-3.5 leading-none" />}
          onClick={() => {
            dispatch({
              type: 'DELETE_TASK',
              payload: {
                publicId: task.publicId,
              },
            });
          }}
        />
        <ButtonIcon variant="transparent" size="small" icon={<MoreHorizontal className="h-3.5 w-3.5 leading-none" />} />
      </div>
    </li>
  );
};
