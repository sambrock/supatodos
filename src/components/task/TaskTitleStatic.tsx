import { cx } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {
  title: string;
  isComplete: boolean;
};

export const stylesTaskIncomplete = cx('line-through text-neutral-600');

export const TaskTitleStatic = ({ title, isComplete, ...props }: Props) => {
  return (
    <div {...props} className={cx(isComplete && stylesTaskIncomplete)}>
      {title}
    </div>
  );
};
