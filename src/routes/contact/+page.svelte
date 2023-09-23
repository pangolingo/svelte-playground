<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form;
	export let data;

	$: message = '';
	if (form?.errors?.values.message) {
		message = form?.errors?.values.message as string;
	}

	const errorsList = (key: string, form: ActionData | null): string[] => {
		return form?.errors?.messages[key] ?? [];
	};
	const hasError = (key: string, form: ActionData | null): boolean => {
		return (form?.errors?.messages[key] ?? []).length > 0;
	};
</script>

<h2 class="h2 mb-2">Contact me</h2>

<form method="post" class="space-y-4 max-w-[16rem]" use:enhance>
	{#if form?.errors}
		<div class="message message--error">
			<p>Oops, we couldn't save the form.</p>
		</div>
	{/if}
	{#if form?.success}
		<div class="message message--success">
			<p>Thanks! We've received your message.</p>
		</div>
	{/if}

	<div class="input-container">
		<label for="f-name" class="input-label">Name</label>
		<div id="f-name-error-messages">
			{#each errorsList('name', form) ?? [] as message}
				<p class="input-error-message">{message}</p>
			{/each}
		</div>
		<input
			type="text"
			name="name"
			id="f-name"
			class="input"
			required
			aria-invalid={hasError('name', form)}
			value={form?.errors?.values.name ?? data.session?.user?.name ?? ''}
			aria-errormessage="f-name-error-messages"
		/>
	</div>

	<div class="input-container">
		<label for="f-email" class="input-label">Email</label>
		<div id="f-email-error-messages">
			{#each errorsList('email', form) ?? [] as message}
				<p class="input-error-message">{message}</p>
			{/each}
		</div>
		<input
			type="email"
			name="email"
			id="f-email"
			class="input"
			required
			aria-invalid={hasError('email', form)}
			value={form?.errors?.values.email ?? data?.session?.user?.email ?? ''}
			aria-errormessage="f-email-error-messages"
		/>
	</div>

	<fieldset class="input-container">
		<legend class="input-label">Favorite colors</legend>
		<div id="f-colors-error-messages">
			{#each errorsList('colors', form) ?? [] as message}
				<p class="input-error-message">{message}</p>
			{/each}
		</div>
		<div>
			<input
				type="checkbox"
				name="colors"
				value="blue"
				id="f-colors-blue"
				checked={form?.errors?.values.colors?.includes('blue')}
				aria-invalid={hasError('colors', form)}
				aria-errormessage="f-colors-error-messages"
			/>
			<label for="f-colors-blue">Blue</label>
		</div>
		<div>
			<input
				type="checkbox"
				name="colors"
				value="green"
				id="f-colors-green"
				checked={form?.errors?.values.colors?.includes('green')}
				aria-invalid={hasError('colors', form)}
				aria-errormessage="f-colors-error-messages"
			/>
			<label for="f-colors-green">Green</label>
		</div>
		<div>
			<input
				type="checkbox"
				name="colors"
				value="red"
				id="f-colors-red"
				checked={form?.errors?.values.colors?.includes('red')}
				aria-invalid={hasError('colors', form)}
				aria-errormessage="f-colors-error-messages"
			/>
			<label for="f-colors-red">Red</label>
		</div>
	</fieldset>

	<div class="input-container">
		<label for="f-message" class="input-label">Message</label>
		<div id="f-message-error-messages">
			{#each errorsList('message', form) ?? [] as message}
				<p class="input-error-message">{message}</p>
			{/each}
		</div>
		<textarea
			class="input"
			name="message"
			id="f-message"
			rows="3"
			aria-invalid={hasError('message', form)}
			aria-errormessage="f-message-error-messages"
			required
			bind:value={message}
		/>
		<span class="input-hint tabular-nums" class:text-red-700={message.length > 30}
			>{message.length}/30</span
		>
	</div>

	<div>
		<button type="submit" class="btn">Submit</button>
	</div>
</form>
