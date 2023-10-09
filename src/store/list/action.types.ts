import type { List, Task } from '@/lib/db/schema';

export type ActionType = 'INITIALIZE' | 'UPDATE_LIST' | 'NEW_TASK' | 'UPDATE_TASK';

interface BaseAction<T extends ActionType> {
  type: T;
  payload?: unknown;
}

interface InitializeAction extends BaseAction<'INITIALIZE'> {
  payload: {
    list: Omit<List, 'id'>;
    tasks: Omit<Task, 'id'>[];
  };
}

interface UpdateListAction extends BaseAction<'UPDATE_LIST'> {
  payload: Partial<Omit<List, 'id'>>;
}

interface NewTaskAction extends BaseAction<'NEW_TASK'> {
  payload?: {
    title: string;
  };
}

interface UpdateTaskAction extends BaseAction<'UPDATE_TASK'> {
  payload: Partial<Omit<Task, 'id'>> & { index: number };
}

export type Action = InitializeAction | UpdateListAction | NewTaskAction | UpdateTaskAction;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
