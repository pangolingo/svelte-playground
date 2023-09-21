import { fail } from '@sveltejs/kit';

export interface ErrorResponse {
	messages: {
		name: string[];
		message: string[];
		email: string[];
		colors: string[];
	};
	values: {
		name: string | null;
		message: string | null;
		email: string | null;
		colors: string[] | null;
	};
}

function hasErrors(errors: ErrorResponse): boolean {
	const keys = Object.keys(errors.messages) as Array<keyof typeof errors.messages>;
	for (const k of keys) {
		// console.log('kkkk', k, keys, errors, errors.messages[k as keyof typeof errors.messages]);
		if (errors.messages[k as keyof typeof errors.messages].length > 0) {
			return true;
		}
	}
	return false;
}

export const actions = {
	default: async ({ request, locals }) => {
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
		const errors: ErrorResponse = {
			messages: {
				name: [],
				message: [],
				email: [],
				colors: []
			},
			values: formValues
		};

		// name
		if (!formValues.name || formValues.name.length < 1) {
			errors.messages.name.push('The name is required.');
		}

		// colors
		if (!formValues.colors || formValues.colors?.length < 1) {
			errors.messages.colors.push('You must pick at least one color.');
		}
		if (formValues.colors?.includes('red') && !formValues.colors?.includes('green')) {
			errors.messages.colors.push('If you choose red, you have to choose green.');
		}
		if (formValues.colors?.includes('green') && !formValues.colors?.includes('red')) {
			errors.messages.colors.push('If you choose green, you have to choose red.');
		}

		// message
		if (!formValues.message || formValues.message.length < 1) {
			errors.messages.message.push('The message is required.');
		}
		if (formValues.message && formValues.message.length > 30) {
			errors.messages.message.push('The message must not be longer than 30 characters.');
		}

		if (hasErrors(errors)) {
			return fail(400, { errors });
		}

		// TODO: save the message

		return { success: true };
	}
};
