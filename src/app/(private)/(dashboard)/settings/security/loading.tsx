import { Skeleton } from '@/shared/ui/shad-cn/skeleton'

export default function Loading() {
  return (
    <div className="flex gap-4 flex-col">
      <Skeleton className={'w-full h-14.5 rounded-lg'}></Skeleton>
      <Skeleton className={'w-full h-14.5 rounded-lg'}></Skeleton>
    </div>
  )
}
