import { Spinner } from '@/shared/ui/shad-cn/spinner'
import { DropdownMenuItem } from '@/shared/ui/shad-cn/dropdown-menu'
import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'

interface Props extends DropdownMenuItemProps {
  loading: boolean
  isIcon?: boolean
  children: ReactNode
}

export function LoadingDropdownItem({
  loading,
  isIcon,
  children,
  className,
  disabled,
  ...props
}: Props & { variant?: 'default' | 'destructive' }) {
  const spinner = loading && <Spinner className="h-4 w-4" />

  return (
    <DropdownMenuItem
      disabled={loading || disabled}
      onSelect={(e) => e.preventDefault()}
      className={cn('flex items-center gap-2', className)}
      {...props}>
      {isIcon ? (
        spinner || children
      ) : (
        <>
          {spinner}
          {children}
        </>
      )}
    </DropdownMenuItem>
  )
}
