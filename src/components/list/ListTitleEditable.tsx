'use client';

import { useEffect, useRef } from 'react';
import { useListStore } from '@/store/list/store';

type Props = {
  initialTitle: string;
};

const dispatch = useListStore.getState().dispatch;

export const ListTitleEditable = ({ initialTitle }: Props) => {
  const title = useListStore((state) => state.data.list?.title ?? initialTitle);

  const titleRef = useRef(initialTitle);

  useEffect(() => {
    if (title !== titleRef.current) {
      titleRef.current = title;
    }
  }, [title]);

  return (
    <div
      onInput={(e) => {
        titleRef.current = e.currentTarget.textContent ?? '';
        dispatch({
          type: 'UPDATE_LIST',
          payload: {
            title: e.currentTarget.textContent ?? '',
          },
        });
      }}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      {titleRef.current}
    </div>
  );
};
