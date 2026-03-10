'use client'

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle
} from '@/shared/ui/shad-cn/drawer'
import { Button } from '@/shared/ui/shad-cn/button'
import ServiceCreateUpdateFrom from '@/entities/service/ui/service-create-update-from'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { serviceSchema } from '@/entities/service/model/service-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServiceMutations } from '@/entities/service/model/use-service-mutations'
import { useServiceStore } from '@/entities/service/model/service-store'
import { ServiceSchemaInput, ServiceSchemaOutput } from '@/entities/service/model/service-schema'

export default function ServiceUpdateDrawer() {
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
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent aria-describedby={undefined}>
				<DrawerHeader>
					<DrawerTitle>Editing</DrawerTitle>
				</DrawerHeader>
				<div className={'flex flex-col gap-4 p-4'}>
					<ServiceCreateUpdateFrom form={form} onSubmit={onSubmit} mutation={mutation} />
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
