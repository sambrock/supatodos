'use client';

import { useListStore } from '@/store/list/store';

type Props = {
  defaultTitle: string;
};

const dispatch = useListStore.getState().dispatch;

export const ListTitle = ({ defaultTitle }: Props) => {
  const title = useListStore((state) => state.data.list?.title || defaultTitle);
  return (
    <div
      className="mb-6"
      contentEditable={true}
      suppressContentEditableWarning={true}
      onInput={(e) => {
        dispatch({ type: 'SET_TITLE', payload: e.currentTarget.textContent });
      }}
    >
      {title}
    </div>
  );
};
