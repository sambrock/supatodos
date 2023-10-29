'use client';

import { useListStore } from '@/store/store';
import { Button } from '../common/Button';
import { type ListStore } from '@/store/store.types';
import { Check, CheckSquare, Square } from 'lucide-react';

type Props = {
  initialCounts: {
    tasks: number;
    complete: number;
  };
};

export const ListNavBar = ({ initialCounts }: Props) => {
  const [tasksCount, completeCount] = useListStore((state) =>
    state.data.counts
      ? [state.data.counts.tasks, state.data.counts.complete]
      : [initialCounts.tasks, initialCounts.complete]
  );

  return (
    <div className="flex items-center space-x-2">
      <Button
        as="a"
        active={true}
        // leading={<Square className="text-neutral-500 h-3.5 w-3.5 -ml-1" />}
        trailing={<span className="text-xs text-neutral-400">{tasksCount}</span>}
      >
        Tasks
      </Button>
      <Button
        as="a"
        variant="ghost"
        // leading={<CheckSquare className="text-neutral-500 h-3.5 w-3.5 -ml-1" />}
        trailing={<span className="text-xs text-neutral-400">{completeCount}</span>}
      >
        Complete
      </Button>
      {/* <span className="text-white/10">|</span>
      <Button as="a" variant="ghost" tone="tag_blue" trailing={<span className="text-xs text-[#2A6FC980]">1</span>}>
        Dev
      </Button>
      <Button as="a" variant="ghost" tone="tag_orange" trailing={<span className="text-xs text-[#D5570080]">2</span>}>
        Database
      </Button> */}
    </div>
  );
};
