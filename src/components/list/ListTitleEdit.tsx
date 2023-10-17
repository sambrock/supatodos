'use client';

import { memo, useEffect, useRef } from 'react';
import { useListStore } from '@/store/list-edit/store';
import { cx } from '@/lib/utils';

type Props = {
  initialTitle: string;
};

const dispatch = useListStore.getState().dispatch;

export const ListTitleStatic = ({ initialTitle }: Props) => {
  const title = useListStore((state) => state.data.list?.title ?? initialTitle);

  const titleRef = useRef(initialTitle);

  useEffect(() => {
    if (title !== titleRef.current) {
      titleRef.current = title;
    }
  }, [title]);

  return (
    <div
      className={cx('text-2xl font-bold focus:outline-none')}
      onInputCapture={(e) => {
        // todo: fix prevent default for undo / redo
        titleRef.current = e.currentTarget.textContent ?? '';
        dispatch({
          type: 'UPDATE_LIST',
          payload: {
            updates: {
              title: e.currentTarget.textContent ?? '',
            },
          },
        });
      }}
    >
      <ListTitleText text={title} matches={title === titleRef.current} />
    </div>
  );
};

const _ListTitleText = ({ text }: { text: string; matches: boolean }) => (
  <div className="focus:outline-none" contentEditable={true} suppressContentEditableWarning={true}>
    {text}
  </div>
);

const ListTitleText = memo(_ListTitleText, (prevProps, nextProps) => {
  return nextProps.matches;
});
