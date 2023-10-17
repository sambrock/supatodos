'use client';

import { Plus } from 'lucide-react';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/list-edit/store';

const dispatch = useListStore.getState().dispatch;

type Props = React.ComponentProps<'div'>;

export const NewTask = ({ ...props }: Props) => {
  return (
    <div {...props} className={cx(props.className, 'border border-white/5 rounded-lg px-3 w-full py-3')}>
      <div className="flex space-x-2 items-center">
        <Plus className="w-5 h-5 text-white/30 focus-within:text-white" />
        <input
          type="text"
          className="focus:outline-none bg-transparent w-full text-sm font-mono placeholder:text-white/30"
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
