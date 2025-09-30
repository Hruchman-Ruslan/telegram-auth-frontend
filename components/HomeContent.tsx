'use client'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/utils/cn'

export default function HomeContent() {
	const searchParams = useSearchParams()
	const sessionFile = searchParams.get('session')

	return (
		<div className={cn('w-full max-w-2xl')}>
			<div className={cn('flex justify-center mb-8')}>
				<div
					className={cn(
						'w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl'
					)}
				>
					<svg
						className={cn('w-10 h-10 text-white')}
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={3}
							d='M5 13l4 4L19 7'
						/>
					</svg>
				</div>
			</div>

			<article
				className={cn(
					'bg-[#17212b] rounded-2xl shadow-2xl border border-[#2b5278]/30 overflow-hidden'
				)}
			>
				<div className={cn('p-8')}>
					<h1 className={cn('text-3xl font-bold text-white mb-4 text-center')}>
						Welcome to Telegram
					</h1>

					{sessionFile ? (
						<section className={cn('space-y-4')}>
							<p className={cn('text-[#8596a8] text-center')}>
								Your session has been created successfully
							</p>

							<div
								className={cn(
									'bg-[#0e1621] p-4 rounded-xl border border-[#2b5278]'
								)}
							>
								<p className={cn('text-[#8596a8] text-xs mb-2 font-medium')}>
									Session ID:
								</p>
								<code
									className={cn('break-all text-sm text-white font-mono block')}
								>
									{sessionFile}
								</code>
							</div>
						</section>
					) : (
						<p className={cn('text-[#8596a8] text-center')}>
							No session found. Please sign in first.
						</p>
					)}
				</div>
			</article>
		</div>
	)
}
