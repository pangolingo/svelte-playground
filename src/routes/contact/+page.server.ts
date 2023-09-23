import { saveMessage } from '$lib/database/messages';
import { fail } from '@sveltejs/kit';
import Joi, { type ValidationError } from 'joi';

type ErrorMessageList = Record<string, string[]>;

const joiErrorsToMessages = (error: ValidationError): ErrorMessageList => {
	const messages: ErrorMessageList = {};
	error.details.forEach((detail) => {
		if (!detail.context?.key) {
			return;
		}
		if (detail.context.key in messages) {
			messages[detail.context.key].push(detail.message);
		} else {
			messages[detail.context.key] = [detail.message];
		}
	});
	return messages;
};

const ContactFormSchema = Joi.object({
	name: Joi.string().required().trim().label('Name'),
	message: Joi.string().required().trim().max(30).label('Message'),
	email: Joi.string().trim().required().email().label('Email'),
	colors: Joi.array()
		.required()
		.min(1)
		.unique()
		.label('Colors')
		.items(Joi.string().valid('red', 'green', 'blue'))
		.custom((colorsValue, helpers) => {
			if (colorsValue.includes('red') && !colorsValue.includes('green')) {
				return helpers.message({ custom: 'If you choose red, you must also choose green' });
			}
			if (colorsValue.includes('green') && !colorsValue.includes('red')) {
				return helpers.message({ custom: 'If you choose green, you must also choose red' });
			}

			return colorsValue;
		})
});

export interface ErrorResponse {
	messages: ErrorMessageList;
	values: {
		name: string | File | null;
		message: string | File | null;
		email: string | File | null;
		colors: Array<string | File> | null;
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.getSession();
		const formData = await request.formData();

		const formValues: ErrorResponse['values'] = {
			name: formData.get('name'),
			message: formData.get('message'),
			email: formData.get('email'),
			colors: formData.getAll('colors')
		};

		const { error: validationError, value: sanitizedFormValues } = ContactFormSchema.validate(
			formValues,
			{ abortEarly: false }
		);

		if (Joi.isError(validationError)) {
			const errors: ErrorResponse = {
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
			colors: sanitizedFormValues.colors
		});

		return { success: true };
	}
};
