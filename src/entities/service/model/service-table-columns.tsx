import { ColumnDef } from '@tanstack/table-core'
import { ServiceTableItem } from '@/entities/service/model/service.type'
import ServiceActionsCell from '@/entities/service/ui/service-action-cell'
import { useServiceMutations } from '@/entities/service/model/use-service-mutations'
import { ServiceStatus } from '@/entities/service/model/service-status.type'

export const getServiceColumns = (
	mutations: ReturnType<typeof useServiceMutations>
): ColumnDef<ServiceTableItem>[] => [
	{
		accessorKey: 'name',
		header: 'Service',
		minSize: 200
	},
	{
		accessorKey: 'description',
		header: 'Notes',
		minSize: 300
	},
	{
		accessorKey: 'price',
		header: 'Price',
		minSize: 140,
		maxSize: 140
	},
	{
		accessorKey: 'durationMin',
		header: 'Duration',
		minSize: 140,
		maxSize: 140
	},
	{
		accessorKey: 'status',
		header: 'Status',
		minSize: 100,
		maxSize: 100
	},
	{
		id: 'actions',
		minSize: 40,
		maxSize: 40,
		cell: ({ row }) => (
			<ServiceActionsCell
				id={row.original.id}
				name={row.original.name}
				price={row.original.price}
				durationMin={row.original.durationMin}
				description={row.original.description}
				status={row.original.status as Exclude<ServiceStatus, 'DELETED'>}
				mutations={mutations}
			/>
		)
	}
]
