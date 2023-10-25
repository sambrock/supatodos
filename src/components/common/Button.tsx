import { forwardRef } from 'react';
import { VariantProps, cva } from 'cva';
import { PolymorphicComponentProps } from '@/lib/polymorphic.types';
import { cx } from '@/lib/utils';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium select-none',
  {
    variants: {
      variant: {
        solid: 'bg-neutral-800 text-neutral-200',
        ghost: 'border',
      },
      tone: {
        neutral: '',
        tag_blue: '',
        tag_orange: '',
      },
      size: {
        default: 'py-1 px-3',
        small: 'py-0.5 px-2',
      },
    },

    compoundVariants: [
      {
        variant: 'ghost',
        tone: 'neutral',
        className: 'border-neutral-800 text-neutral-400 hover:bg-neutral-800/60',
      },
      {
        variant: 'ghost',
        tone: 'tag_blue',
        className: 'border-[#2A6FC9cc] text-[#2A6FC9CC] hover:bg-[#2A6FC920]',
      },
      {
        variant: 'ghost',
        tone: 'tag_orange',
        className: 'border-[#D55700cc] text-[#D55700CC] hover:bg-[#D5570020]',
      },
    ],

    defaultVariants: {
      variant: 'solid',
      tone: 'neutral',
      size: 'default',
    },
  }
);

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  VariantProps<typeof buttonVariants> & {
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
  }
>;

const ButtonComponent = <C extends React.ElementType>(
  { as, variant, size, tone, ...props }: ButtonProps<C>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const Component = as || 'button';

  return (
    <Component ref={ref} {...props} className={cx(buttonVariants({ variant, size, tone }))}>
      {props.leading && <span className="mr-2">{props.leading}</span>}
      {props.children}
      {props.trailing && <span className="ml-2">{props.trailing}</span>}
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