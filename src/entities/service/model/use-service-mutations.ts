import { useMutation, useQueryClient } from '@tanstack/react-query'
import { archiveService } from '@/entities/service/api/archive-service'
import { unarchiveService } from '@/entities/service/api/unarchive-service'
import { deleteService } from '@/entities/service/api/delete-service'
import { serviceSchema } from '@/entities/service/model/service-schema'
import { createService } from '@/entities/service/api/create-service'
import { z } from 'zod'
import { updateService } from '@/entities/service/api/update-service'

export const useServiceMutations = () => {
  const queryService = useQueryClient()

  const invalidate = async () => await queryService.invalidateQueries({ queryKey: ['services'] })

  return {
    create: useMutation({
      mutationFn: (data: z.infer<typeof serviceSchema>) => createService(data),
      onSuccess: async () => await invalidate()
    }),
    update: useMutation({
      mutationFn: ({ id, data }: { id: string; data: z.infer<typeof serviceSchema> }) =>
        updateService(id, data),
      onSuccess: async () => await invalidate()
    }),
    archive: useMutation({
      mutationFn: (id: string) => archiveService(id),
      onSuccess: async () => await invalidate()
    }),
    unarchive: useMutation({
      mutationFn: (id: string) => unarchiveService(id),
      onSuccess: async () => await invalidate()
    }),
    delete: useMutation({
      mutationFn: (id: string) => deleteService(id),
      onSuccess: async () => await invalidate()
    })
  }
}
