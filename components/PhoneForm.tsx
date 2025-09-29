'use client'

import { useActionState } from 'react'
import { authAction } from '@/actions/auth-action'
import { cn } from '@/utils/cn'

export default function PhoneForm() {
	const [state, formAction, isPending] = useActionState(authAction, {
		step: 'phone' as const,
		success: false,
		phone: '',
		error: '',
	})

	return (
		<form
			action={formAction}
			className={cn(
				'flex flex-col gap-6 w-full max-w-md p-8',
				'bg-gradient-to-br from-purple-700 via-black to-indigo-500',
				'rounded-2xl shadow-xl'
			)}
		>
			{state.step === 'phone' && (
				<label className={cn('flex flex-col gap-2 text-white font-semibold')}>
					Phone
					<input
						type='tel'
						name='phone'
						placeholder='+380XXXXXXXXX'
						className={cn(
							'p-3 rounded-lg border border-white/30 bg-white/20',
							'text-white placeholder-white/70',
							'focus:outline-none focus:ring-2 focus:ring-white focus:border-white',
							'transition-all'
						)}
					/>
				</label>
			)}

			{state.step === 'code' && (
				<>
					<label className={cn('flex flex-col gap-2 text-white font-semibold')}>
						Code
						<input
							type='text'
							name='code'
							className={cn(
								'p-3 rounded-lg border border-white/30 bg-white/20',
								'text-white placeholder-white/70',
								'focus:outline-none focus:ring-2 focus:ring-white focus:border-white',
								'transition-all'
							)}
						/>
					</label>
					<input type='hidden' name='phone' value={state.phone} />
				</>
			)}

			{state.error && (
				<p className={cn('text-red-600 text-sm font-medium animate-pulse')}>
					{state.error}
				</p>
			)}

			<button
				type='submit'
				disabled={isPending}
				className={cn(
					'mt-2 py-3 px-6 rounded-full',
					'bg-white/30 text-white font-bold',
					'hover:bg-white/50 hover:text-purple-800 transition-all shadow-lg',
					'disabled:opacity-50 disabled:cursor-not-allowed'
				)}
			>
				{isPending ? 'Loading...' : 'Submit'}
			</button>
		</form>
	)
}
