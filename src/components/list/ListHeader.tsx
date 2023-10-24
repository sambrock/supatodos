'use client';

import { timeAgo } from '@/lib/utils';
import { useListStore } from '@/store/store';

type Props = {
  username: string;
  title: string;
  updatedAt: Date;
};

export const ListHeader = ({ username, title, updatedAt }: Props) => {
  const taskCount = useListStore((state) => state.data.tasks?.size ?? 0);

  return (
    <div className="flex items-baseline text-xs text-white/40 font-medium gap-6">
      {/* <div>{date.format(Date.now())}</div> */}
      <div className="ml-auto inline-flex gap-2">
        <div className="">Updated {timeAgo(updatedAt)}</div>
      </div>
    </div>
  );
};
