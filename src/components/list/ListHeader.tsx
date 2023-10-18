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
    <div className="flex items-center text-xs text-white/40 font-medium">
      <div className="space-x-1">
        <span>{username}</span>
        <span className="select-none">/</span>
        <span>{title}</span>
      </div>
      <span className="ml-6">{taskCount} tasks</span>

      <span className="ml-auto">Updated {timeAgo(updatedAt)}</span>
    </div>
  );
};
