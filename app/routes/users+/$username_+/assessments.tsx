import { Outlet } from "react-router"
import { GeneralErrorBoundary } from "#app/components/error-boundary.tsx"
import { useOptionalUser } from "#app/utils/user.ts"
import { type Route } from "../+types"

export default function AssessmentsRoute({ loaderData }: Route.ComponentProps) {
	const user = useOptionalUser()
	return (
		<main className="container flex min-h-[400px] flex-1 px-0 pb-12 md:px-8">
					<Outlet />
		</main>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No user with the username "{params.username}" exists</p>
				),
			}}
		/>
	)
}
