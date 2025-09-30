import { cn } from '@/utils/cn'

import HomeContent from '@/components/HomeContent'

export default function Home() {
	return (
		<main
			className={cn(
				'min-h-screen bg-[#0e1621] flex items-center justify-center p-6'
			)}
		>
			<HomeContent />
		</main>
	)
}
