import { cn } from '@/utils/cn'

import PhoneForm from '@/components/PhoneForm'
import TelegramLogo from '@/components/TelegramLogo'

export default function StartPage() {
	return (
		<main
			className={cn(
				'min-h-screen bg-[#0e1621] flex items-center justify-center p-6'
			)}
		>
			<div className={cn('w-full max-w-md')}>
				<TelegramLogo />
				<PhoneForm />
			</div>
		</main>
	)
}
