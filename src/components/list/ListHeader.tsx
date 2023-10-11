import { timeAgo } from '@/lib/utils';

type Props = {
  username: string;
  title: string;
  updatedAt: Date;
};

export const ListHeader = ({ username, title, updatedAt }: Props) => {
  return (
    <div className="flex items-center text-xs text-white/40 font-medium">
      <div className="space-x-1">
        <span>{username}</span>
        <span>/</span>
        <span>{title}</span>
      </div>

      <span className="ml-6">Updated {timeAgo(updatedAt)}</span>
    </div>
  );
};
