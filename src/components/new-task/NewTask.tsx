'use client';

import { Plus } from 'lucide-react';
import { cx } from '@/lib/utils';
import { useListStore } from '@/store/list/store';

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
          placeholder="Do the laundry -priority !! -tag dev,ui"
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              dispatch({
                type: 'NEW_TASK',
                payload: {
                  task: {
                    id: Date.now(),
                    title: e.currentTarget.value,
                    priorityLevel: 1,
                    tags: [],
                    completed: false,
                  },
                },
              })
            }
          }}
        />
      </div>
    </div>
  );
};
