'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { authAction } from '@/actions/auth-action'
import { cn } from '@/utils/cn'

const steps = {
	phone: {
		title: 'Sign in to Telegram',
		subtitle: 'Please confirm your country code and enter your phone number',
		label: 'Phone Number',
		type: undefined,
		placeholder: undefined,
		maxLength: undefined,
		inputClass: undefined,
	},
	code: {
		title: 'Enter Code',
		subtitle: (phone: string) => `We've sent the code to ${phone}`,
		label: 'Code',
		placeholder: '12345',
		type: 'text' as const,
		maxLength: 5,
		inputClass: 'text-center text-2xl tracking-widest',
	},
	password: {
		title: 'Two-Step Verification',
		subtitle: 'Your account has 2FA enabled',
		label: 'Password',
		placeholder: 'Enter your password',
		type: 'password' as const,
		maxLength: undefined,
		inputClass: undefined,
	},
}

export default function PhoneForm() {
	const router = useRouter()
	const [phoneValue, setPhoneValue] = useState<string>('')

	const [state, formAction, isPending] = useActionState(authAction, {
		step: 'phone' as const,
		success: false,
		phone: '',
		error: '',
	})

	useEffect(() => {
		if (state.success) router.push('/home')
	}, [state.success, router])

	const currentStep = steps[state.step]
	const subtitle =
		typeof currentStep.subtitle === 'function'
			? currentStep.subtitle(state.phone)
			: currentStep.subtitle

	return (
		<form
			action={formAction}
			className={cn(
				'bg-[#17212b] rounded-2xl shadow-2xl overflow-hidden border border-[#2b5278]/30 w-full max-w-md'
			)}
		>
			<div className={cn('p-8')}>
				<h1 className={cn('text-2xl font-bold text-white mb-2 text-center')}>
					{currentStep.title}
				</h1>
				<p className={cn('text-[#8596a8] text-sm text-center mb-6')}>
					{subtitle}
				</p>

				<div className={cn('space-y-2')}>
					<label className={cn('text-[#8596a8] text-sm font-medium')}>
						{currentStep.label}
					</label>

					{state.step === 'phone' ? (
						<div
							className={cn(
								'relative flex items-center',
								'w-full p-4 rounded-lg bg-[#0e1621]',
								'border border-[#2b5278] focus-within:border-[#2AABEE]',
								'transition-colors',
								'[&_.PhoneInputCountrySelectDropdown]:bg-[#17212b]',
								'[&_.PhoneInputCountrySelectDropdown]:border',
								'[&_.PhoneInputCountrySelectDropdown]:border-[#2b5278]',
								'[&_.PhoneInputCountrySelectDropdown]:rounded-lg',
								'[&_.PhoneInputCountrySelectDropdown]:shadow-2xl',
								'[&_.PhoneInputCountrySelectDropdown]:max-h-64',
								'[&_.PhoneInputCountrySelectDropdown]:overflow-auto',
								'[&_.PhoneInputCountryOption]:text-white',
								'[&_.PhoneInputCountryOption]:px-4',
								'[&_.PhoneInputCountryOption]:py-2',
								'[&_.PhoneInputCountryOption]:cursor-pointer',
								'[&_.PhoneInputCountryOption:hover]:bg-[#0e1621]',
								'[&_.PhoneInputCountryOption--selected]:bg-[#2AABEE]',
								'[&_.PhoneInputCountryOption--selected]:text-white'
							)}
						>
							<PhoneInput
								international
								defaultCountry='UA'
								value={phoneValue}
								onChange={value => setPhoneValue(value || '')}
								className={cn(
									'flex-1',
									'[&_.PhoneInputInput]:bg-transparent',
									'[&_.PhoneInputInput]:text-white',
									'[&_.PhoneInputInput]:border-0',
									'[&_.PhoneInputInput]:outline-none',
									'[&_.PhoneInputInput]:p-0',
									'[&_.PhoneInputInput]:text-base',
									'[&_.PhoneInputInput]:placeholder-[#5a6d7f]',
									'[&_.PhoneInputCountry]:mr-3',
									'[&_.PhoneInputCountrySelect]:bg-transparent',
									'[&_.PhoneInputCountrySelect]:text-black',
									'[&_.PhoneInputCountrySelect]:border-0',
									'[&_.PhoneInputCountrySelect]:outline-none',
									'[&_.PhoneInputCountrySelect]:p-0',
									'[&_.PhoneInputCountrySelect]:cursor-pointer',
									'[&_.PhoneInputCountryIcon]:w-6',
									'[&_.PhoneInputCountryIcon]:h-6',
									'[&_.PhoneInputCountryIcon]:rounded-sm',
									'[&_.PhoneInputCountryIcon]:shadow-sm',
									'[&_.PhoneInputCountrySelectArrow]:ml-2',
									'[&_.PhoneInputCountrySelectArrow]:text-[#8596a8]',
									'[&_.PhoneInputCountrySelectArrow]:opacity-70'
								)}
							/>
							<input type='hidden' name='phone' value={phoneValue} />
						</div>
					) : (
						<>
							<input
								type={currentStep.type}
								name={state.step}
								placeholder={currentStep.placeholder}
								maxLength={currentStep.maxLength}
								autoFocus
								className={cn(
									'w-full p-4 rounded-lg bg-[#0e1621] text-white',
									'border border-[#2b5278] focus:border-[#2AABEE]',
									'placeholder-[#5a6d7f] focus:outline-none transition-colors',
									currentStep.inputClass
								)}
							/>
							<input type='hidden' name='phone' value={state.phone} />
						</>
					)}
				</div>

				{state.error && (
					<div
						className={cn(
							'mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20'
						)}
					>
						<p className={cn('text-red-400 text-sm text-center')}>
							{state.error}
						</p>
					</div>
				)}

				<button
					type='submit'
					disabled={isPending}
					className={cn(
						'w-full mt-6 py-3.5 px-6 rounded-lg font-medium',
						'bg-[#2AABEE] hover:bg-[#229ED9] text-white',
						'transition-all shadow-lg shadow-[#2AABEE]/20',
						'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
					)}
				>
					{isPending ? 'Please wait...' : 'Next'}
				</button>
			</div>
		</form>
	)
}
