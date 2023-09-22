import { saveMessage } from '$lib/database/messages';
import { fail } from '@sveltejs/kit';
import Joi, { type ValidationError } from 'joi';

type ErrorMessageList = Record<string, string[]>

const joiErrorsToMessages = (error: ValidationError): ErrorMessageList => {
	const messages: ErrorMessageList = {}
	error.details.forEach(detail => {
		if (!detail.context?.key) {
			return;
		}
		if (detail.context.key in messages) {
			messages[detail.context.key].push(detail.message)
		} else {
			messages[detail.context.key] = [detail.message]
		}
	})
	return messages;
}

const ContactFormSchema = Joi.object({
	// label
	name: Joi.string().required().trim().label('Name'),
	message: Joi.string().required().trim().max(30).label('Message'),
	email: Joi.string().trim().required().email().label('Email'),
	colors: Joi.array().required().min(1).unique().label('Colors').items(
		Joi.string().valid('red', 'green', 'blue')
	).custom((colorsValue, helpers) => {
		if (colorsValue.includes('red') && !colorsValue.includes('green')) {
			return helpers.message({ custom: "If you choose red, you must also choose green" });
		}
		if (colorsValue.includes('green') && !colorsValue.includes('red')) {
			return helpers.message({ custom: "If you choose green, you must also choose red" });
		}

		return colorsValue;
	})
})

export interface ErrorResponse {
	// messages: {
	// 	name: string[];
	// 	message: string[];
	// 	email: string[];
	// 	colors: string[];
	// };
	messages: ErrorMessageList,
	values: {
		name: string | File | null;
		message: string | File | null;
		email: string | File | null;
		colors: Array<string | File> | null;
	};
}

// function hasErrors(errors: ErrorResponse): boolean {
// 	const keys = Object.keys(errors.messages) as Array<keyof typeof errors.messages>;
// 	for (const k of keys) {
// 		// console.log('kkkk', k, keys, errors, errors.messages[k as keyof typeof errors.messages]);
// 		if (errors.messages[k as keyof typeof errors.messages].length > 0) {
// 			return true;
// 		}
// 	}
// 	return false;
// }

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.getSession()
		const formData = await request.formData();

		for (const pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}

		const formValues: ErrorResponse['values'] = {
			name: formData.get('name'),
			message: formData.get('message'),
			email: formData.get('email'),
			colors: formData.getAll('colors')
		};

		const { error: validationError, value: sanitizedFormValues } = ContactFormSchema.validate(formValues, { abortEarly: false });

		console.log('error', JSON.stringify(validationError, undefined, 2))
		console.log('value', sanitizedFormValues)

		// const errors: ErrorResponse = {
		// 	messages: {
		// 		name: [],
		// 		message: [],
		// 		email: [],
		// 		colors: []
		// 	},
		// 	values: formValues
		// };




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
		})

		return { success: true };
	}
};
