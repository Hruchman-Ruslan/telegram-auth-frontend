'use server'

import { redirect } from 'next/navigation'
import { apiRequest } from '@/utils/api'
import { validators } from '@/utils/validation'

export type AuthStateType = {
	step: 'phone' | 'code' | 'password'
	success: boolean
	phone: string
	error: string
}

export async function authAction(
	prevState: AuthStateType,
	formData: FormData
): Promise<AuthStateType> {
	const phone = (formData.get('phone') as string)?.trim() || ''
	const code = (formData.get('code') as string)?.trim() || ''
	const password = (formData.get('password') as string)?.trim() || ''

	if (prevState.step === 'phone') {
		const error = validators.phone(phone)
		if (error) return { ...prevState, error }

		const { data, error: apiError } = await apiRequest('/send_code', { phone })

		if (apiError && !apiError.toLowerCase().includes('all available options')) {
			return { ...prevState, error: apiError }
		}

		return { ...prevState, step: 'code', phone, error: '' }
	}

	if (prevState.step === 'code') {
		const error = validators.code(code)
		if (error) return { ...prevState, error }

		const { data, error: apiError } = await apiRequest<{
			status?: string
			session_file?: string
		}>('/sign_in', { phone: prevState.phone, code })

		if (apiError) return { ...prevState, error: apiError }

		if (data?.status === 'need_password') {
			return { ...prevState, step: 'password', error: '' }
		}

		if (data?.session_file) {
			redirect(`/home?session=${encodeURIComponent(data.session_file)}`)
		}
	}

	if (prevState.step === 'password') {
		const error = validators.password(password)
		if (error) return { ...prevState, error }

		const { data, error: apiError } = await apiRequest<{
			session_file: string
		}>('/sign_in_password', { phone: prevState.phone, password })

		if (apiError) return { ...prevState, error: apiError }

		if (data?.session_file) {
			redirect(`/home?session=${encodeURIComponent(data.session_file)}`)
		}
	}

	return prevState
}
