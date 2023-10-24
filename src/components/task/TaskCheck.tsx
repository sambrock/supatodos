'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cx } from '@/lib/utils';

type Props = { isComplete: boolean } & React.ComponentPropsWithoutRef<typeof Checkbox.Root>;

export const TaskCheck = ({ isComplete, ...inputProps }: Props) => {
  return (
    <Checkbox.Root
      checked={isComplete}
      className={cx('w-4 h-4 border border-neutral-700 rounded focus:outline-none', {
        'bg-neutral-800': isComplete,
      })}
      {...inputProps}
    >
      <Checkbox.Indicator className={cx('flex items-center justify-center text-current')}>
        <Check className="h-3 w-3 text-neutral-600 font-semibold" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
};
