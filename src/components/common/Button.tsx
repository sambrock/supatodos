import { forwardRef } from 'react';
import { PolymorphicComponentProps } from '@/lib/polymorphic.types';
import { cx } from '@/lib/utils';

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  {
    tone?: 'neutral' | 'critical' | 'neutral-blur';
    size?: 'default' | 'small';
    icon?: React.ReactNode;
    isDisabled?: boolean;
  }
>;

const ButtonComponent = <C extends React.ElementType>(
  props: ButtonProps<C>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const Component = props.as || 'button';

  return (
    <Component
      ref={ref}
      {...props}
      className={cx(
        'select-none cursor-pointer rounded font-medium',
        {
          'bg-neutral-800': props.tone === 'neutral' || !props.tone,
        },
        {
          'py-1 px-3 text-sm': props.size === 'default' || !props.size,
        }
      )}
    >
      {props.children}
    </Component>
  );
};

export const Button = forwardRef(ButtonComponent);

// https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
declare module 'react' {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
