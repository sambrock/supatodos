import type { List, Task } from '@/lib/db/schema';
import type { Action } from './action.types';

export type ListStore = {
  data: {
    list: Omit<List, 'id'> | null;
    tasks: Map<number, Omit<Task, 'id'>> | null;
  };

  dispatch: (action: Action) => void;
};
