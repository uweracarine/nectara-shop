import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  shadow?: 'sm' | 'md' | 'lg' | 'none'
}

/**
 * Card Component
 *
 * A container component for content with optional hover effect and shadow.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardBody>
 *     Content here
 *   </CardBody>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, shadow = 'md', ...props }, ref) => {
    const shadowClasses = {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      none: 'shadow-none',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-gray-200 bg-white',
          shadowClasses[shadow],
          hover && 'transition-all duration-200 hover:shadow-lg hover:border-gray-300 cursor-pointer',
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('border-b border-gray-200 px-6 py-4', className)} {...props} />
  )
)

CardHeader.displayName = 'CardHeader'

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
  )
)

CardBody.displayName = 'CardBody'

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-t border-gray-200 bg-gray-50 px-6 py-3', className)}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-lg font-semibold text-gray-900', className)} {...props} />
  )
)

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-600', className)} {...props} />
  )
)

CardDescription.displayName = 'CardDescription'

export { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription }
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps, CardTitleProps, CardDescriptionProps }
