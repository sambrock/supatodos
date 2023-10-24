import { PRIORITY_LEVELS } from '@/lib/constants';
import { cx } from '@/lib/utils';

type Props = {
  priorityLevel: number;
  isComplete: boolean;
} & React.ComponentProps<'div'>;

export const TaskPriority = ({ priorityLevel, isComplete, ...divProps }: Props) => {
  // Normal
  if (priorityLevel === 1) return null;

  // Low
  if (priorityLevel === 2)
    return (
      <div
        {...divProps}
        className={cx('text-sm font-medium', !isComplete ? 'text-amber-500' : 'text-white/20', divProps.className)}
      >
        <span>{PRIORITY_LEVELS.get(priorityLevel)?.shorthand}</span>
      </div>
    );

  // High
  if (priorityLevel === 3)
    return (
      <div
        {...divProps}
        className={cx('text-sm font-medium', !isComplete ? 'text-red-500' : 'text-white/20', divProps.className)}
      >
        <span>{PRIORITY_LEVELS.get(priorityLevel)?.shorthand}</span>
      </div>
    );
};
