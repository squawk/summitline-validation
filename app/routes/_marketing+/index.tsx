export const meta = () => [{ title: 'Summit Line Construction Safety Functional Competency Assessment' }]

export default function Index() {
	return (
		<main className="font-poppins grid min-h-[calc(100vh-200px)] place-items-center">
			<h1
				data-heading
				className="mt-8 animate-slide-top text-4xl font-medium text-foreground [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-5xl xl:mt-4 xl:animate-slide-left xl:text-6xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
			>
				<span className="text-summit-red">Summit Line</span> Construction
				<br /> Safety Assessment 
			</h1>
		</main>
	)
}