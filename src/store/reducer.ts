import { type Draft, produce, produceWithPatches, Patch } from 'immer';
import type { ListStore } from './store.types';
import type { Action, ActionPayload } from './action.types';
import { generatePublicId } from '@/lib/utils';

const initializeStore = produce((draft: Draft<ListStore>, payload: ActionPayload<'INITIALIZE'>) => {
  const { list, tasks, counts } = payload;
  draft.data.list = list;
  draft.data.tasks = new Map(tasks.map((task, index) => [task.publicId, { ...task, index }]));
  draft.data.counts = counts;
});

const updateList = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'UPDATE_LIST'>) => {
  const { updates } = payload;
  draft.data.list = {
    ...draft.data.list!,
    ...updates,
  };

  // if (list) Object.assign(list, updates);
});

const newTask = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'NEW_TASK'>) => {
  const task = payload.task;
  const taskPublicId = generatePublicId();

  draft.data.tasks!.set(taskPublicId, {
    title: task.title,
    publicId: taskPublicId,
    priorityLevel: task.priorityLevel || 1,
    isComplete: false,
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    index: draft.data.tasks!.size,
  });

  draft.data.counts!.tasks = draft.data.counts!.tasks + 1;
});

const updateTask = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'UPDATE_TASK'>) => {
  const { publicId, updates } = payload;
  const task = draft.data.tasks!.get(publicId);

  if (updates.isComplete !== null && updates.isComplete !== undefined) {
    if (updates.isComplete === task?.isComplete) return;
    if (updates.isComplete) {
      draft.data.counts!.tasks = draft.data.counts!.tasks - 1;
      draft.data.counts!.complete = draft.data.counts!.complete + 1;
    } else {
      draft.data.counts!.tasks = draft.data.counts!.tasks + 1;
      draft.data.counts!.complete = draft.data.counts!.complete - 1;
    }
  }

  if (task) Object.assign(task, updates);
});

const deleteTask = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'DELETE_TASK'>) => {
  const { publicId } = payload;
  const task = draft.data.tasks!.get(publicId);

  if (task?.isComplete) {
    draft.data.counts!.complete = draft.data.counts!.complete - 1;
  } else {
    draft.data.counts!.tasks = draft.data.counts!.tasks - 1;
  }

  draft.data.tasks!.delete(publicId);
});

const newStateWithPatches = produce((draft: Draft<ListStore>, patches: [Patch[], Patch[]]) => {
  draft.patches.stack = draft.patches.stack.slice(0, draft.patches.stackPointer + 1).concat([patches]);
  draft.patches.stackPointer = draft.patches.stackPointer + 1;

  draft.operations = draft.operations.concat(patches[0]);
});

export const reducer = (state: ListStore, action: Action): ListStore => {
  console.log(action);
  switch (action.type) {
    case 'INITIALIZE': {
      const newState = initializeStore(state, action.payload);
      return newState;
    }
    case 'NEW_TASK': {
      const [newState, patches, inverse] = newTask(state, action.payload);
      return newStateWithPatches(newState, [patches, inverse]);
    }
    case 'UPDATE_LIST': {
      const [newState, patches, inverse] = updateList(state, action.payload);
      return newStateWithPatches(newState, [patches, inverse]);
    }
    case 'UPDATE_TASK': {
      const [newState, patches, inverse] = updateTask(state, action.payload);
      return newStateWithPatches(newState, [patches, inverse]);
    }
    case 'DELETE_TASK': {
      const [newState, patches, inverse] = deleteTask(state, action.payload);
      return newStateWithPatches(newState, [patches, inverse]);
    }
    default: {
      return state;
    }
  }
};
