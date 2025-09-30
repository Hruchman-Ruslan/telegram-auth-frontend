const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function apiRequest<T>(
	endpoint: string,
	body: Record<string, string>
): Promise<{ data?: T; error?: string }> {
	try {
		const res = await fetch(`${BACKEND_URL}${endpoint}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})

		const data = await res.json()

		if (data.detail || data.error) {
			return { error: data.detail || data.error }
		}

		return { data }
	} catch {
		return { error: 'Connection error. Check your internet connection' }
	}
}
