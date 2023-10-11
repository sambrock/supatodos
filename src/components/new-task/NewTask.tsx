'use client';

import { ChevronRight } from 'lucide-react';
import { cx } from '@/lib/utils';

type Props = React.ComponentProps<'div'>;

export const NewTask = ({ ...props }: Props) => {
  return (
    <div {...props} className={cx(props.className, 'border border-white/5 rounded-lg px-3 w-full py-3')}>
      <div className="flex space-x-2 items-center">
        <ChevronRight className="w-5 h-5 text-white/30 focus-within:text-white" />
        <input
          type="text"
          className="focus:outline-none bg-transparent w-full text-sm font-mono placeholder:text-white/30"
          placeholder="Do the laundry -due:tomorrow -tag:home"
        />
      </div>
    </div>
  );
};
