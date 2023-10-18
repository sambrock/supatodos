import type { Patch } from 'immer';
import type { List, Task } from '@/lib/db/schema';
import type { Action } from './action.types';

export type ListStore = {
  data: {
    list: List | null;
    tasks: Map<string, Task> | null;
  };

  patches: {
    stack: [Patch[], Patch[]][]; // patches, inverse patches
    stackPointer: number;
  };

  transactions: Patch[][];

  dispatch: (action: Action) => void;
};
