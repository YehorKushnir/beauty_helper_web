import { useMutation, useQueryClient } from '@tanstack/react-query'
import { archiveClient } from '@/entities/client/api/archive-client'
import { unarchiveClient } from '@/entities/client/api/unarchive-client'
import { removeClientData } from '@/entities/client/api/remove-client-data'
import { deleteClient } from '@/entities/client/api/delete-client'
import { banClient } from '@/entities/client/api/ban-client'
import { unbanClient } from '@/entities/client/api/unban-client'
import { clientSchema } from '@/entities/client/model/client-schema'
import { createClient } from '@/entities/client/api/create-client'
import { z } from 'zod'
import { updateClient } from '@/entities/client/api/update-client'

export const useClientMutations = () => {
  const queryClient = useQueryClient()

  const invalidate = async () => await queryClient.invalidateQueries({ queryKey: ['clients'] })

  return {
    create: useMutation({
      mutationFn: (data: z.infer<typeof clientSchema>) => createClient(data),
      onSuccess: async () => await invalidate()
    }),
    update: useMutation({
      mutationFn: ({ id, data }: { id: string; data: z.infer<typeof clientSchema> }) =>
        updateClient(id, data),
      onSuccess: async () => await invalidate()
    }),
    archive: useMutation({
      mutationFn: (id: string) => archiveClient(id),
      onSuccess: async () => await invalidate()
    }),
    unarchive: useMutation({
      mutationFn: (id: string) => unarchiveClient(id),
      onSuccess: async () => await invalidate()
    }),
    ban: useMutation({
      mutationFn: (id: string) => banClient(id),
      onSuccess: async () => await invalidate()
    }),
    unban: useMutation({
      mutationFn: (id: string) => unbanClient(id),
      onSuccess: async () => await invalidate()
    }),
    removeData: useMutation({
      mutationFn: (id: string) => removeClientData(id),
      onSuccess: async () => await invalidate()
    }),
    delete: useMutation({
      mutationFn: (id: string) => deleteClient(id),
      onSuccess: async () => await invalidate()
    })
  }
}
