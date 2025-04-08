import { faker } from '@faker-js/faker'
import { HttpResponse, http, type HttpHandler } from 'msw'
import { requireHeader, writeEmail } from './utils.ts'

const { json } = HttpResponse

export const handlers: Array<HttpHandler> = [
	// Keep the old Resend handler for backward compatibility
	http.post(`https://api.resend.com/emails`, async ({ request }) => {
		requireHeader(request.headers, 'Authorization')
		const body = await request.json()
		console.info('🔶 mocked email contents (resend):', body)

		const email = await writeEmail(body)

		return json({
			id: faker.string.uuid(),
			from: email.from,
			to: email.to,
			created_at: new Date().toISOString(),
		})
	}),
	
	// Add SendGrid handler
	http.post(`https://api.sendgrid.com/v3/mail/send`, async ({ request }) => {
		requireHeader(request.headers, 'Authorization')
		
		// Create a safe email mock
		const safeEmail = {
			from: 'unknown@example.com',
			to: 'unknown@example.com',
			subject: 'Unknown Email',
			html: '',
			text: ''
		}
		
		try {
			const parsedBody = await request.json() as {
				personalizations?: Array<{to: Array<{email: string}>}>;
				content?: Array<{type: string; value: string}>;
				from?: {email: string};
				subject?: string;
			}
			
			console.info('🔶 mocked email contents (sendgrid):', parsedBody)
			
			// Try to extract email data safely
			const fromEmail = parsedBody?.from?.email
			const toEmail = parsedBody?.personalizations?.[0]?.to?.[0]?.email
			const subject = parsedBody?.subject
			const htmlContent = parsedBody?.content?.find(c => c.type === 'text/html')?.value
			const textContent = parsedBody?.content?.find(c => c.type === 'text/plain')?.value
			
			// If we have all the required fields, use them
			if (fromEmail && toEmail) {
				safeEmail.from = fromEmail
				safeEmail.to = toEmail
				if (subject) safeEmail.subject = subject
				if (htmlContent) safeEmail.html = htmlContent
				if (textContent) safeEmail.text = textContent
			}
		} catch (error) {
			console.error('Error parsing SendGrid request body:', error)
		}
		
		const email = await writeEmail(safeEmail)

		return json({
			statusCode: 202,
			body: {},
			headers: {
				'x-message-id': faker.string.uuid(),
			}
		})
	}),
]