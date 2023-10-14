import { PRIORITY_LEVELS } from '@/lib/constants';
import { cx } from '@/lib/utils';

type Props = {
  priorityLevel: number;
} & React.ComponentProps<'div'>;

export const TaskPriority = ({ priorityLevel, ...divProps }: Props) => {
  // Normal
  if (priorityLevel === 1) return null;

  // Low
  if (priorityLevel === 2)
    return (
      <div {...divProps} className={cx('text-amber-500 text-sm font-medium', divProps.className)}>
        <span>{PRIORITY_LEVELS.get(priorityLevel)?.shorthand}</span>
      </div>
    );

  // High
  if (priorityLevel === 3)
    return (
      <div {...divProps} className={cx('text-red-500 text-sm font-medium', divProps.className)}>
        <span>{PRIORITY_LEVELS.get(priorityLevel)?.shorthand}</span>
      </div>
    );
};
