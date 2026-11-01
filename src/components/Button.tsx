import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
import { cn } from '../lib/utils';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../lib/constants';

type Variant = keyof typeof BUTTON_VARIANTS;
type Size = keyof typeof BUTTON_SIZES;

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
}

type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseProps> & {
    as?: T;
  };

export default function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps<T>) {
  // Cast nécessaire — voir JSDoc ci-dessus
  const Component = (as ?? 'button') as ElementType;
  const isIconOnly = !children;
  const sizeConfig = BUTTON_SIZES[size];

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300',
    BUTTON_VARIANTS[variant],
    isIconOnly ? sizeConfig.paddingIcon : sizeConfig.padding,
    !isIconOnly && sizeConfig.text,
    (disabled || isLoading) && 'opacity-50 cursor-not-allowed hover:scale-100',
    className,
  );

  const content = (
    <>
      {isLoading ? (
        <span className={cn('inline-block border-2 border-current border-t-transparent rounded-full animate-spin', sizeConfig.icon)} />
      ) : icon ? (
        <span className={cn('inline-flex items-center justify-center shrink-0', sizeConfig.icon)}>{icon}</span>
      ) : null}
      {children && <span>{isLoading ? 'Envoi…' : children}</span>}
    </>
  );

  const componentProps = Component === 'a'
    ? { className: classes, ...props }
    : { className: classes, disabled: disabled || isLoading, ...props };

  return <Component {...componentProps}>{content}</Component>;
}