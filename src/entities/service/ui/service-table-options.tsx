'use client'

import ServiceCreateDialog from '@/entities/service/ui/service-create-dialog'
import ServiceSearch from '@/entities/service/ui/service-search'
import ServiceStatusTabs from '@/entities/service/ui/service-status-tabs'
import { ServiceStatus } from '@/entities/service/model/service-status.type'
import ServiceUpdateDialog from '@/entities/service/ui/service-update-dialog'
import { useIsMobile } from '@/shared/lib/hooks/use-mobile'

interface Props {
	initSearch: string
	initStatus?: ServiceStatus | 'ALL'
}

export default function ServiceTableOptions({ initSearch, initStatus }: Props) {
	const isMobile = useIsMobile()
	return (
		<div className={'flex items-center justify-between gap-2'}>
			<div className={'w-full flex items-center gap-2'}>
				<ServiceStatusTabs initStatus={initStatus} />
				<ServiceSearch initSearch={initSearch} />
			</div>
			{!isMobile && (
				<>
					<ServiceCreateDialog />
					<ServiceUpdateDialog />
				</>
			)}
		</div>
	)
}
