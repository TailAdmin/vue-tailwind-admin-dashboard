import { cn } from '@/utils/cn'

export type AlertVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info'

const base =
  "group/alert relative grid w-full gap-0.5 rounded-xl border px-2.5 py-2 text-start text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4"

const variants: Record<AlertVariant, string> = {
  default:
    'bg-white text-gray-700 border-gray-200 dark:border-gray-800 dark:bg-[#1E2634] dark:text-gray-300',
  success:
    'bg-green-50 border-green-500 *:[svg]:text-green-500 dark:bg-green-500/10 dark:border-green-500/30 dark:*:[svg]:text-green-400',
  warning:
    'bg-amber-50 border-amber-500 *:[svg]:text-amber-500 dark:bg-amber-500/10 dark:border-amber-500/30 dark:*:[svg]:text-amber-400',
  destructive:
    'bg-red-50 border-red-500 *:[svg]:text-red-500 dark:bg-red-500/10 dark:border-red-500/30 dark:*:[svg]:text-red-400',
  info: 'bg-sky-50 border-sky-500 *:[svg]:text-sky-500 dark:bg-sky-500/10 dark:border-sky-500/30 dark:*:[svg]:text-sky-400',
}

export function alertVariants({
  variant = 'default',
  class: className,
}: { variant?: AlertVariant; class?: string } = {}) {
  return cn(base, variants[variant], className)
}
