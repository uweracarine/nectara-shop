import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Spinner } from './Spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#C9A961] text-white hover:bg-[#B8985A] focus-visible:ring-[#C9A961]',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-200',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
        outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-300',
        ghost: 'text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300',
        link: 'text-[#C9A961] underline-offset-4 hover:underline focus-visible:ring-[#C9A961]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

/**
 * Button Component
 *
 * A flexible button component with multiple variants, sizes, and states.
 *
 * @example
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 *
 * @example
 * <Button isLoading variant="secondary">
 *   Loading...
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      icon,
      iconPosition = 'left',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            {children}
          </>
        ) : icon ? (
          <>
            {iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            {children}
            {iconPosition === 'right' && <span className="ml-2">{icon}</span>}
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
