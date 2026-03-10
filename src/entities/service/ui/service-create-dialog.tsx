'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui/shad-cn/dialog'
import { Button } from '@/shared/ui/shad-cn/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	serviceSchema,
	ServiceSchemaInput,
	ServiceSchemaOutput
} from '@/entities/service/model/service-schema'
import { z } from 'zod'
import { useState } from 'react'
import { useServiceMutations } from '@/entities/service/model/use-service-mutations'
import ServiceCreateUpdateFrom from '@/entities/service/ui/service-create-update-from'

export default function ServiceCreateDialog() {
	const [open, setOpen] = useState<boolean>(false)

	const form = useForm<ServiceSchemaInput, any, ServiceSchemaOutput>({
		resolver: zodResolver(serviceSchema),
		defaultValues: {
			name: '',
			price: '',
			durationMin: '',
			description: ''
		}
	})

	const mutation = useServiceMutations().create

	const onSubmit = async (data: ServiceSchemaOutput) => {
		mutation.mutate(data, {
			onSuccess: () => {
				setOpen(false)
				form.reset()
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add a service</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>Add a new service</DialogTitle>
				</DialogHeader>
				<ServiceCreateUpdateFrom form={form} onSubmit={onSubmit} mutation={mutation} />
			</DialogContent>
		</Dialog>
	)
}
