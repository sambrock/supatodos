import type { List, Tag, Task } from '@/lib/db/schema';
import type { Action } from './action.types';

export type ListStore = {
  data: {
    list: List | null;
    tasks: Map<string, Task> | null;
    tags: Map<string, Tag & { _ignore?: boolean }> | null;
  };

  dispatch: (action: Action) => void;
};
