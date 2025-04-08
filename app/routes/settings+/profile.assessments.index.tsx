import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { data, useFetcher } from 'react-router'
import { z } from 'zod'
import { ErrorList, Field } from '#app/components/forms.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { type Route } from './+types/profile.assessments.index.ts'

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

const AssessmentSchema = z.object({
	skill: z.string().min(1, 'Skill is required'),
	level: z.enum(['beginner', 'intermediate', 'advanced'], {
		invalid_type_error: 'Please select a skill level',
	}),
	notes: z.string().optional(),
})

export type AssessmentData = {
	id: string
	skill: string
	level: 'beginner' | 'intermediate' | 'advanced'
	notes: string | null
	createdAt: Date
	updatedAt: Date
}

export async function loader({ request }: Route.LoaderArgs) {
	const userId = await requireUserId(request)
	
	// Mock assessment data - in a real implementation, this would come from the database
	const mockAssessments: AssessmentData[] = [
		{
			id: '1',
			skill: 'JavaScript',
			level: 'advanced',
			notes: 'Proficient in modern JS, including ES6+ features',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: '2',
			skill: 'React',
			level: 'intermediate',
			notes: 'Comfortable with hooks and context, learning suspense',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: '3',
			skill: 'TypeScript',
			level: 'beginner',
			notes: 'Understanding basics, need more practice with advanced types',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]

	return {
		assessments: mockAssessments,
	} as const
}

type AssessmentActionArgs = {
	request: Request
	userId: string
	formData: FormData
}

const addAssessmentActionIntent = 'add-assessment'
const deleteAssessmentActionIntent = 'delete-assessment'

export async function action({ request }: Route.ActionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const intent = formData.get('intent')
	
	switch (intent) {
		case addAssessmentActionIntent: {
			return addAssessmentAction({ request, userId, formData })
		}
		case deleteAssessmentActionIntent: {
			return deleteAssessmentAction({ request, userId, formData })
		}
		default: {
			throw new Response(`Invalid intent "${intent}"`, { status: 400 })
		}
	}
}

async function addAssessmentAction({ userId, formData }: AssessmentActionArgs) {
	const submission = await parseWithZod(formData, {
		schema: AssessmentSchema,
	})

	if (submission.status !== 'success') {
		return data(
			{ result: submission.reply() },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	// In a real implementation, you would save to the database here
	// const { skill, level, notes } = submission.value
	// await prisma.assessment.create({
	//   data: {
	//     skill,
	//     level,
	//     notes,
	//     userId,
	//   },
	// })

	return {
		result: submission.reply(),
		status: 'success',
	}
}

async function deleteAssessmentAction({ formData }: AssessmentActionArgs) {
	const assessmentId = formData.get('assessmentId')
	invariantResponse(typeof assessmentId === 'string', 'Assessment ID is required')

	// In a real implementation, you would delete from the database here
	// await prisma.assessment.delete({
	//   where: { id: assessmentId },
	// })

	return {
		status: 'success' as const,
	}
}

export default function AssessmentsRoute({ loaderData }: Route.ComponentProps) {
	return (
		<div className="flex flex-col gap-12">
			<div>
				<h1 className="text-h1 mb-3">Skill Assessments</h1>
				<p className="text-muted-foreground">
					Track your skills and progress in different technology areas.
				</p>
			</div>

			<AddAssessment />

			<div className="mt-5">
				<h2 className="text-lg font-semibold mb-4">Your Assessments</h2>
				{loaderData.assessments.length === 0 ? (
					<p className="text-muted-foreground">You have no assessments yet.</p>
				) : (
					<div className="grid gap-4">
						{loaderData.assessments.map((assessment: AssessmentData) => (
							<AssessmentItem key={assessment.id} assessment={assessment} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

function AddAssessment() {
	const fetcher = useFetcher<typeof addAssessmentAction>()

	const [form, fields] = useForm({
		id: 'add-assessment',
		constraint: getZodConstraint(AssessmentSchema),
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AssessmentSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div className="bg-muted/40 p-6 rounded-md">
			<h2 className="font-medium text-lg mb-4">Add New Assessment</h2>
			<fetcher.Form method="POST" {...getFormProps(form)}>
				<div className="grid gap-4 sm:grid-cols-2">
					<Field
						labelProps={{
							htmlFor: fields.skill.id,
							children: 'Skill',
						}}
						inputProps={getInputProps(fields.skill, { type: 'text' })}
						errors={fields.skill.errors}
					/>

					<div className="space-y-2">
						<label htmlFor={fields.level.id} className="text-sm font-medium">
							Skill Level
						</label>
						<select
							id={fields.level.id}
							name={fields.level.name}
							defaultValue=""
							className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
							aria-describedby={fields.level.errorId}
						>
							<option value="" disabled>
								Select skill level
							</option>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
						</select>
						{fields.level.errors ? (
							<div id={fields.level.errorId} className="text-destructive text-sm">
								{fields.level.errors}
							</div>
						) : null}
					</div>

					<div className="sm:col-span-2">
						<Field
							labelProps={{
								htmlFor: fields.notes.id,
								children: 'Notes (optional)',
							}}
							inputProps={{
								...getInputProps(fields.notes, { type: 'text' }),
								className: 'h-24 resize-none',
							}}
							errors={fields.notes.errors}
						/>
					</div>
				</div>

				<ErrorList errors={form.errors} id={form.errorId} />

				<div className="mt-6 flex justify-end">
					<StatusButton
						type="submit"
						size="sm"
						name="intent"
						value={addAssessmentActionIntent}
						status={
							fetcher.state !== 'idle' ? 'pending' : (form.status ?? 'idle')
						}
					>
						<Icon name="plus">Add Assessment</Icon>
					</StatusButton>
				</div>
			</fetcher.Form>
		</div>
	)
}

function AssessmentItem({ assessment }: { assessment: AssessmentData }) {
	const fetcher = useFetcher<typeof deleteAssessmentAction>()
	const isDeleting = fetcher.state !== 'idle'

	// Get label color based on skill level
	const getLevelColor = (level: string) => {
		switch (level) {
			case 'beginner':
				return 'bg-yellow-100 text-yellow-800'
			case 'intermediate':
				return 'bg-blue-100 text-blue-800'
			case 'advanced':
				return 'bg-green-100 text-green-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<div className={`border rounded-md p-4 ${isDeleting ? 'opacity-50' : ''}`}>
			<div className="flex justify-between items-start">
				<div>
					<h3 className="font-semibold text-lg">{assessment.skill}</h3>
					<span
						className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getLevelColor(
							assessment.level,
						)}`}
					>
						{assessment.level.charAt(0).toUpperCase() + assessment.level.slice(1)}
					</span>
				</div>
				<fetcher.Form method="POST">
					<input type="hidden" name="assessmentId" value={assessment.id} />
					<StatusButton
						type="submit"
						variant="ghost"
						size="sm"
						name="intent"
						value={deleteAssessmentActionIntent}
						status={isDeleting ? 'pending' : 'idle'}
						disabled={isDeleting}
						className="text-destructive-foreground"
					>
						<Icon name="trash" size="sm" />
					</StatusButton>
				</fetcher.Form>
			</div>
			{assessment.notes && (
				<p className="text-muted-foreground mt-2 text-sm">{assessment.notes}</p>
			)}
			<div className="text-xs text-muted-foreground mt-3">
				Last updated: {assessment.updatedAt.toLocaleDateString()}
			</div>
		</div>
	)
}