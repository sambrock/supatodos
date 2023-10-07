import type { List, Task } from '@/lib/db/schema';

export type ActionType = 'INITIALIZE' | 'SET_TITLE' | 'ADD_TASK';

interface BaseAction<T extends ActionType> {
  type: T;
  payload?: unknown;
}

export interface InitializeAction extends BaseAction<'INITIALIZE'> {
  payload: {
    list: Omit<List, 'id'>;
    tasks: Omit<Task, 'id'>[];
  };
}

export interface SetTitleAction extends BaseAction<'SET_TITLE'> {
  payload: string | null;
}

export interface AddTaskAction extends BaseAction<'ADD_TASK'> {
  payload: Partial<Omit<Task, 'id'>>;
}

export type Action = InitializeAction | SetTitleAction | AddTaskAction;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
