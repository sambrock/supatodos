'use client';

import { Button } from '../common/Button';

export const ListNavBar = () => {
  return (
    <div className="flex items-center space-x-2">
      <Button as="a" trailing={<span className="text-xs text-neutral-400">8</span>}>
        Todos
      </Button>
      <Button as="a" variant="ghost" trailing={<span className="text-xs text-neutral-400">22</span>}>
        Complete
      </Button>
      <span className="text-white/10">|</span>
      <Button as="a" variant="ghost" tone="tag_blue" trailing={<span className="text-xs text-[#2A6FC980]">1</span>}>
        Dev
      </Button>
      <Button as="a" variant="ghost" tone="tag_orange" trailing={<span className="text-xs text-[#D5570080]">2</span>}>
        Database
      </Button>
    </div>
  );
};
