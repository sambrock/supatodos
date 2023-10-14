import type { List, Tag, Task } from '@/lib/db/schema';

export type ActionType = 'INITIALIZE' | 'UPDATE_LIST' | 'NEW_TASK' | 'UPDATE_TASK';

interface BaseAction<T extends ActionType> {
  type: T;
  payload?: unknown;
}

interface InitializeAction extends BaseAction<'INITIALIZE'> {
  payload: {
    list: List;
    tasks: Task[];
    tags: Tag[];
  };
}

interface UpdateListAction extends BaseAction<'UPDATE_LIST'> {
  payload: {
    list: Partial<List>;
  };
}

interface NewTaskAction extends BaseAction<'NEW_TASK'> {
  payload: {
    task: {
      name: string;
      priorityLevel?: number;
    };
    tags: Partial<Tag>[];
  };
}

interface UpdateTaskAction extends BaseAction<'UPDATE_TASK'> {
  payload: {
    index: number;
    task: Partial<Task>;
  };
}

export type Action = InitializeAction | UpdateListAction | NewTaskAction | UpdateTaskAction;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
