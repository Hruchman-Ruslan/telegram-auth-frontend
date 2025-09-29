'use server'

import { redirect } from 'next/navigation'

export type AuthStateType = {
	step: 'phone' | 'code'
	success: boolean
	phone: string
	error: string
}

export async function authAction(
	prevState: AuthStateType,
	formData: FormData
): Promise<AuthStateType> {
	const phone = formData.get('phone') as string
	const code = formData.get('code') as string

	if (prevState.step === 'phone') {
		if (!phone || phone.trim() === '') {
			return {
				step: 'phone',
				success: false,
				phone: '',
				error: 'Phone is required',
			}
		}

		return {
			step: 'code',
			success: false,
			phone,
			error: '',
		}
	}

	if (prevState.step === 'code') {
		if (!code || code.trim() === '') {
			return {
				step: 'code',
				success: false,
				phone: prevState.phone,
				error: 'Code is required',
			}
		}

		redirect('/home')
	}

	return prevState
}
