import { Form } from 'react-router'
import { z } from 'zod'
import { Icon } from '#app/components/ui/icon.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { useIsPending } from './misc.tsx'

// Empty array since we're removing all providers
export const providerNames = [] as const
export const ProviderNameSchema = z.enum(providerNames)
export type ProviderName = z.infer<typeof ProviderNameSchema>

export const providerLabels: Record<string, string> = {}
export const providerIcons: Record<string, React.ReactNode> = {}

export function ProviderConnectionForm({
	redirectTo,
	type,
	providerName,
}: {
	redirectTo?: string | null
	type: 'Connect' | 'Login' | 'Signup'
	providerName: string
}) {
	const label = providerLabels[providerName] || providerName
	const formAction = `/auth/${providerName}`
	const isPending = useIsPending({ formAction })
	return (
		<Form
			className="flex items-center justify-center gap-2"
			action={formAction}
			method="POST"
		>
			{redirectTo ? (
				<input type="hidden" name="redirectTo" value={redirectTo} />
			) : null}
			<StatusButton
				type="submit"
				className="w-full"
				status={isPending ? 'pending' : 'idle'}
			>
				<span className="inline-flex items-center gap-1.5">
					{providerIcons[providerName] || null}
					<span>
						{type} with {label}
					</span>
				</span>
			</StatusButton>
		</Form>
	)
}