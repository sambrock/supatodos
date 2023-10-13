import type { Tag } from '@/lib/db/schema';

type Props = {
  tag: Tag;
};

export const TaskTag = ({ tag }: Props) => {
  return <li className="font-medium text-white/50 bg-white/5 rounded px-2 py-0.5 text-xs">{tag.name}</li>;
};
