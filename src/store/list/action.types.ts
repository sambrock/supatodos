import type { List, Task } from '@/lib/db/schema';

export type ActionType = 'INITIALIZE' | 'SET_TITLE' | 'NEW_TASK' | 'UPDATE_TASK';

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

interface SetTitleAction extends BaseAction<'SET_TITLE'> {
  payload: string | null;
}

interface NewTaskAction extends BaseAction<'NEW_TASK'> {
  payload?: {
    title: string;
  };
}

interface UpdateTaskAction extends BaseAction<'UPDATE_TASK'> {
  payload: Partial<Omit<Task, 'id'>> & { index: number };
}

export type Action = InitializeAction | SetTitleAction | NewTaskAction | UpdateTaskAction;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
