'use client';

import { Plus } from 'lucide-react';
import { cx } from '@/lib/utils';

type Props = React.ComponentProps<'div'>;

export const NewTask = ({ ...props }: Props) => {
  return (
    <div {...props} className={cx(props.className, 'border border-white/5 rounded-lg w-1/2 px-3 py-3')}>
      <div className="flex space-x-2 items-center">
        <Plus className="w-6 h-6 text-white/40" />
        <input
          type="text"
          className="focus:outline-none bg-transparent w-full text-sm rounded-lg placeholder:text-white/40"
          placeholder="Add a task"
        />
      </div>
    </div>
  );
};
