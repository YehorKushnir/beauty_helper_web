'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/shad-cn/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceSchema } from '@/entities/service/model/service-schema'
import { useServiceMutations } from '@/entities/service/model/use-service-mutations'
import ServiceCreateUpdateFrom from '@/entities/service/ui/service-create-update-from'
import { useServiceStore } from '@/entities/service/model/service-store'
import { useEffect } from 'react'
import { ServiceSchemaInput, ServiceSchemaOutput } from '@/entities/service/model/service-schema'

export default function ServiceUpdateDialog() {
	const open = useServiceStore((state) => state.editing)
	const setOpen = useServiceStore((state) => state.setEditing)
	const payload = useServiceStore((state) => state.editPayload)

	const form = useForm<ServiceSchemaInput, any, ServiceSchemaOutput>({
		resolver: zodResolver(serviceSchema),
		defaultValues: {
			name: '',
			price: '',
			durationMin: '',
			description: ''
		}
	})

	useEffect(() => {
		if (!payload) return

		form.reset({
			name: payload.name,
			price: payload.price,
			durationMin: payload.durationMin.toString(),
			description: payload.description
		})
	}, [payload])

	const mutation = useServiceMutations().update

	const onSubmit = async (data: ServiceSchemaOutput) => {
		if (payload?.id) {
			mutation.mutate(
				{ id: payload.id, data },
				{
					onSuccess: () => {
						setOpen(false)
						form.reset()
					}
				}
			)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>Editing</DialogTitle>
				</DialogHeader>
				<ServiceCreateUpdateFrom
					form={form}
					onSubmit={onSubmit}
					mutation={mutation}
					isUpdate={true}
				/>
			</DialogContent>
		</Dialog>
	)
}
