import { Suspense } from 'react'

import { cn } from '@/utils/cn'

import HomeContent from '@/components/HomeContent'

export default function Home() {
	return (
		<main
			className={cn(
				'min-h-screen bg-[#0e1621] flex items-center justify-center p-6'
			)}
		>
			<Suspense fallback={<p className='text-white'>Loading...</p>}>
				<HomeContent />
			</Suspense>
		</main>
	)
}
