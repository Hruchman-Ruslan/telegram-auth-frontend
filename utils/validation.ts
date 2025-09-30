export const validators = {
	phone: (phone: string) => {
		if (!phone) return 'Phone number is required'
		if (!/^\+\d{10,15}$/.test(phone))
			return 'Invalid phone format. Use format: +380XXXXXXXXX'
		return null
	},

	code: (code: string) => {
		if (!code) return 'Verification code is required'
		if (!/^\d{5}$/.test(code)) return 'Code must contain 5 digits'
		return null
	},

	password: (password: string) => {
		if (!password) return 'Password is required'
		if (password.length < 4) return 'Password is too short'
		return null
	},
}
