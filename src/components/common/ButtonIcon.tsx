import { forwardRef } from 'react';
import { type VariantProps, cva } from 'cva';
import { type PolymorphicComponentProps } from '@/lib/polymorphic.types';
import { cx } from '@/lib/utils';

const buttonIconVariants = cva(
  'cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium select-none',
  {
    variants: {
      variant: {
        solid: '',
        ghost: 'border bg-transparent',
        transparent: 'bg-transparent',
      },
      tone: {
        neutral: '',
      },
      size: {
        default: 'text-xs h-8 w-8',
        small: 'text-xs h-6 w-6',
      },
    },

    compoundVariants: [
      { variant: 'solid', tone: 'neutral', className: 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700' }, // prettier-ignore
      { variant: 'ghost', tone: 'neutral', className: 'border-neutral-800 text-neutral-500 hover:text-neutral-200' }, // prettier-ignore
      { variant: 'transparent', tone: 'neutral', className: 'bg-transparent text-neutral-500 hover:text-neutral-200' }, // prettier-ignore
      // { variant: 'solid', tone: 'neutral', className: 'bg-neutral-800 text-neutral-200' }, // prettier-ignore
    ],

    defaultVariants: {
      variant: 'solid',
      tone: 'neutral',
      size: 'default',
    },
  }
);

type ButtonIconProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  VariantProps<typeof buttonIconVariants> & {
    icon: React.ReactNode;
  }
>;

// eslint-disable-next-line react/display-name
export const ButtonIconComponent = (
  { icon, variant, size, tone, ...props }: ButtonIconProps<'button'>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  return (
    <button {...props} ref={ref} className={cx(buttonIconVariants({ variant, size, tone }))}>
      {icon}
    </button>
  );
};

export const ButtonIcon = forwardRef(ButtonIconComponent);

// https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
declare module 'react' {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
