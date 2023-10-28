'use client';

import { forwardRef, memo, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useListStore } from '@/store/store';
import { cx } from '@/lib/utils';

const dispatch = useListStore.getState().dispatch;

type Props = React.ComponentProps<'div'> & {
  publicId: string;
  initialTitle: string;
};

export const TaskTitle = ({ publicId, initialTitle, ...props }: Props) => {
  const storeTitle = useListStore((state) => state.data.tasks?.get(publicId)?.title ?? initialTitle);

  // TODO: Use debounce inside input event instead of state?
  const [title, setTitle] = useState<string>(initialTitle);
  const debouncedValue = useDebounce<string>(title, 500);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedValue === initialTitle) return;
    if (title === storeTitle) return;
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        publicId,
        updates: { title: divRef.current?.innerText ?? '' },
      },
    });
  }, [debouncedValue]);

  useEffect(() => {
    if (divRef.current === null) return;
    if (divRef.current.innerText === storeTitle) return;
    divRef.current.innerText = storeTitle;
    divRef.current.blur();
  }, [storeTitle]);

  return (
    <ContentEditableDiv
      {...props}
      ref={divRef}
      onInput={(e) => {
        if (e.currentTarget.textContent === storeTitle) return;
        setTitle(e.currentTarget.textContent ?? '');
      }}
      className="w-full"
    >
      {initialTitle}
    </ContentEditableDiv>
  );
};

// eslint-disable-next-line react/display-name
const ContentEditableDiv = memo(
  forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={cx(props.className, 'focus:outline-none')}
      />
    );
  }),
  // Don't rerender on any prop change
  // Prevents cursor from jumping to end of input
  // TODO: Probably a better way to do this
  () => true
);
