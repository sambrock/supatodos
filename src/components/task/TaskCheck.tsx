'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cx } from '@/lib/utils';

type Props = { isComplete: boolean } & React.ComponentPropsWithoutRef<typeof Checkbox.Root>;

export const TaskCheck = ({ isComplete, ...inputProps }: Props) => {
  return (
    <Checkbox.Root
      checked={isComplete}
      className={cx('w-4 h-4 border border-white/10 rounded focus:outline-none', {
        'bg-[#c79d48]': isComplete,
      })}
      {...inputProps}
    >
      <Checkbox.Indicator className={cx('flex items-center justify-center text-current')}>
        <Check className="h-3.5 w-3.5 text-black font-semibold" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
};
