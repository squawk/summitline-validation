import { render } from '@react-email/components'
import sgMail, { type MailDataRequired } from '@sendgrid/mail'
import { type ReactElement } from 'react'
import { z } from 'zod'

const sendgridErrorSchema = z.object({
	name: z.string(),
	message: z.string(),
	statusCode: z.number().optional(),
	code: z.string().optional(),
	response: z.object({
		headers: z.record(z.string()).optional(),
		body: z.any().optional(),
		statusCode: z.number().optional(),
	}).optional(),
})
type SendgridError = z.infer<typeof sendgridErrorSchema>

const sendgridSuccessSchema = z.object({
	statusCode: z.number(),
	body: z.any(),
	headers: z.record(z.string()),
})

export async function sendEmail({
	react,
	...options
}: {
	to: string
	subject: string
} & (
	| { html: string; text: string; react?: never }
	| { react: ReactElement; html?: never; text?: never }
)) {
	const from = 'no-reply@fidello.com'

	const email = {
		from,
		...options,
		...(react ? await renderReactEmail(react) : null),
	}

	// Set up SendGrid API key
	if (!process.env.SENDGRID_API_KEY && !process.env.MOCKS) {
		console.error(`SENDGRID_API_KEY not set and we're not in mocks mode.`)
		console.error(
			`To send emails, set the SENDGRID_API_KEY environment variable.`,
		)
		console.error(`Would have sent the following email:`, JSON.stringify(email))
		return {
			status: 'success',
			data: { id: 'mocked' },
		} as const
	}

	if (process.env.SENDGRID_API_KEY) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY)
	}
	try {
		const sgMailData: MailDataRequired = {
			to: email.to,
			from: email.from,
			subject: email.subject,
			content: [
				{
					type: 'text/html',
					value: email.html || '',
				},
				{
					type: 'text/plain',
					value: email.text || '',
				},
			],
		}

		console.log('🔶 Sending email:', JSON.stringify(sgMailData, null, 2))
		
		const response = await sgMail.send(sgMailData)
		const parsedResponse = sendgridSuccessSchema.safeParse(response[0])
		
		if (parsedResponse.success) {
			return {
				status: 'success',
				data: { id: parsedResponse.data.headers['x-message-id'] || 'sent' },
			} as const
		} else {
			return {
				status: 'error',
				error: {
					name: 'UnknownError',
					message: 'Unknown Error',
					statusCode: 500,
					cause: response,
				},
			} as const
		}
	} catch (error) {
		const parseResult = sendgridErrorSchema.safeParse(error)
		if (parseResult.success) {
			return {
				status: 'error',
				error: parseResult.data,
			} as const
		} else {
			return {
				status: 'error',
				error: {
					name: 'UnknownError',
					message: 'Unknown Error',
					statusCode: 500,
				} as SendgridError,
			} as const
		}
	}
}

async function renderReactEmail(react: ReactElement) {
	const [html, text] = await Promise.all([
		render(react),
		render(react, { plainText: true }),
	])
	return { html, text }
}
