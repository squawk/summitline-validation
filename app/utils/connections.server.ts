// import { createCookieSessionStorage } from 'react-router'
import { type ProviderName } from './connections.tsx'
import { GitHubProvider } from './providers/github.server.ts'
import { type AuthProvider } from './providers/provider.ts'
import { type Timings } from './timing.server.ts'

// Create a map of available providers
export const providers: Record<ProviderName, AuthProvider> = {
	'dummy-provider': new GitHubProvider(), // Using GitHub provider as a placeholder
}

export function handleMockAction(providerName: ProviderName, request: Request) {
	const provider = providers[providerName];
	if (!provider) {
		throw new Error(`Provider ${providerName} not supported`);
	}
	return provider.handleMockAction(request);
}

export function resolveConnectionData(
	providerName: ProviderName,
	providerId: string,
	options?: { timings?: Timings },
) {
	const provider = providers[providerName];
	if (!provider) {
		throw new Error(`Provider ${providerName} not supported`);
	}
	return provider.resolveConnectionData(providerId, options);
}