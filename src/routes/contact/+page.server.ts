import { saveMessage } from '$lib/database/messages';
import { joiErrorsToMessages, type ErrorResponse } from '$lib/validation';
import { ContactFormSchema, type ExpectedFormData } from '$lib/validation/contact';
import { fail } from '@sveltejs/kit';
import Joi from 'joi';

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.getSession();
		const formData = await request.formData();

		const formValues: ErrorResponse<ExpectedFormData>['values'] = {
			name: formData.get('name'),
			message: formData.get('message'),
			email: formData.get('email'),
			starters: formData.getAll('starters')
		};

		const { error: validationError, value: sanitizedFormValues } = ContactFormSchema.validate(
			formValues,
			{ abortEarly: false }
		);

		if (Joi.isError(validationError)) {
			const errors: ErrorResponse<ExpectedFormData> = {
				messages: joiErrorsToMessages(validationError),
				values: formValues
			};
			return fail(400, { errors });
		}

		await saveMessage({
			userId: session?.user?.sub ?? null,
			name: sanitizedFormValues.name,
			email: sanitizedFormValues.email,
			message: sanitizedFormValues.message,
			starters: sanitizedFormValues.starters
		});

		return { success: true };
	}
};
