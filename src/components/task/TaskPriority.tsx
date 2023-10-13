import type { Priority } from '@/lib/db/schema';
import { cx } from '@/lib/utils';

type Props = {
  priority: Priority;
} & React.ComponentProps<'div'>;

export const TaskPriority = ({ priority, ...divProps }: Props) => {
  // Normal
  if (priority.level === 1) return null;
  // return (
  //   <div {...divProps} className={cx('text-white/40 text-sm font-medium', divProps.className)}>
  //     <span>-</span>
  //   </div>
  // );

  // Low
  if (priority.level === 2)
    return (
      <div {...divProps} className={cx('text-amber-500 text-sm font-medium', divProps.className)}>
        <span>!</span>
      </div>
    );

  // High
  if (priority.level === 3)
    return (
      <div {...divProps} className={cx('text-red-500 text-sm font-medium', divProps.className)}>
        <span>!!</span>
      </div>
    );
};
