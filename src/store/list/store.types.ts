import type { List, Tag, Task, TaskWithRelations } from '@/lib/db/schema';
import type { Action } from './action.types';

export type ListStore = {
  data: {
    list: List | null;
    tasks: Map<number, TaskWithRelations & { tags: number[] }> | null;
    tags: Map<number, Tag & { _ignore?: boolean }> | null;
  };

  dispatch: (action: Action) => void;
};
