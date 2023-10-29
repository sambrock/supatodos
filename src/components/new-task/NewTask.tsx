'use client';

import { Plus } from 'lucide-react';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/store';

const dispatch = useListStore.getState().dispatch;

type Props = React.ComponentProps<'div'>;

export const NewTask = ({ ...props }: Props) => {
  return (
    <div
      {...props}
      className={cx(
        props.className,
        'group border bg-neutral-900/50 backdrop-blur-lg border-neutral-800 rounded-lg px-3 py-3'
      )}
    >
      <div className="flex space-x-2 items-center">
        <Plus className="w-4 h-4 text-neutral-600 group-focus-within:text-neutral-400" />
        <input
          type="text"
          className="focus:outline-none bg-transparent w-full font-sans text-sm font-medium placeholder:text-neutral-500"
          placeholder="Do the laundry -priority !! -tags dev,ui"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const parsed = parseNewTaskInput(e.currentTarget.value);
              dispatch({
                type: 'NEW_TASK',
                payload: {
                  task: {
                    title: parsed.title,
                    priorityLevel: parsed.priority,
                  },
                },
              });
            }
          }}
        />
      </div>
    </div>
  );
};

const parseNewTaskInput = (input: string) => {
  const parts = input.split(' ');

  let title = '';
  let priority = 1;
  let tags: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === '-priority' || part === '-p') {
      const priorityValue = parts[i + 1];
      if (priorityValue === '1' || priorityValue === '!') priority = 2;
      if (priorityValue === '2' || priorityValue === '!!') priority = 3;
      i++;
    } else if (part === '-tags' || part === '-t') {
      tags = parts[i + 1].split(',');
      i++;
    } else {
      title += part + ' ';
    }
  }

  title = title.trim();

  return { title, priority, tags };
};
