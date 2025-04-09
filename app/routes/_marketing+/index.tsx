import { Link } from 'react-router'
import { Button } from '#app/components/ui/button.tsx'
import { useOptionalUser } from '#app/utils/user.ts'

export const meta = () => [
	{ title: 'Summit Line Construction Safety Functional Competency Assessment' },
]

export default function Index() {
	const user = useOptionalUser()

	return (
		<main className="font-poppins grid min-h-[calc(100vh-200px)] place-items-center">
			<h1
				data-heading
				className="animate-slide-top text-foreground xl:animate-slide-left mt-8 text-4xl font-medium [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-5xl xl:mt-4 xl:text-6xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
			>
				<span className="text-summit-red">Summit Line</span> Construction
				<br /> Safety Assessment
				<br />
				{user ? (
					<Button asChild variant="default" size="lg">
						<Link to={`/users/${user.username}/assessments`}>Take Assessment</Link>
					</Button>
				) : (
					<Button asChild variant="default" size="lg">
						<Link to="/onboarding">Get Started</Link>
					</Button>
				)}
			</h1>
		</main>
	)
}
