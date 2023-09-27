<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, Snapshot } from './$types';

	export let form;
	export let data;
	let submitting = false;

	let name = form?.errors?.values.name as (string | null | undefined) ?? (data.session?.user?.name ||  '')
	let email = form?.errors?.values.email as (string | null | undefined) ?? (data.session?.user?.email ||  '')
	let message = form?.errors?.values.message as (string | null | undefined) ?? ''
	let starters: string[] = form?.errors?.values.starters as (string[] | null | undefined) ?? []

	if (form?.errors?.values.message) {
		message = form?.errors?.values.message as string;
	}

	const errorsList = (key: string, form: ActionData | null): string[] => {
		return form?.errors?.messages[key] ?? [];
	};
	const hasError = (key: string, form: ActionData | null): boolean => {
		return (form?.errors?.messages[key] ?? []).length > 0;
	};

	export const snapshot: Snapshot<{name: string, email: string, message: string, starters: string[]}> = {
		capture: () => {
			return {
				name,
				email,
				message,
				starters,
			}
		},
		restore: (snapshotValue) => {
			name ||= snapshotValue?.name
			email ||= snapshotValue?.email
			message ||= snapshotValue?.message
			starters = starters.length > 0 ? starters : snapshotValue?.starters
		}
	};
</script>

<h2 class="h2 mb-2">Contact me</h2>

<form method="post" class="space-y-4 max-w-[16rem]" use:enhance={() => {
	submitting = true;

	return ({update}) => {
		update().then(() => submitting = false)
	}
}}>
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
			bind:value={name}
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
			bind:value={email}
			aria-errormessage="f-email-error-messages"
		/>
	</div>

	<fieldset class="input-container">
		<legend class="input-label">Who's your favorite starter pokemon?</legend>
		<div id="f-starters-error-messages">
			{#each errorsList('starters', form) ?? [] as message}
				<p class="input-error-message">{message}</p>
			{/each}
		</div>
		<div>
			<input
				type="checkbox"
				name="starters"
				value="charmander"
				bind:group={starters}
				id="f-starters-charmander"
				aria-invalid={hasError('starters', form)}
				aria-errormessage="f-starters-error-messages"
			/>
			<label for="f-starters-charmander">Charmander</label>
		</div>
		<div>
			<input
				type="checkbox"
				name="starters"
				value="squirtle"
				bind:group={starters}
				id="f-starters-squirtle"
				aria-invalid={hasError('starters', form)}
				aria-errormessage="f-starters-error-messages"
			/>
			<label for="f-starters-squirtle">Squirtle</label>
		</div>
		<div>
			<input
				type="checkbox"
				name="starters"
				value="bulbasaur"
				bind:group={starters}
				id="f-starters-bulbasaur"
				aria-invalid={hasError('starters', form)}
				aria-errormessage="f-starters-error-messages"
			/>
			<label for="f-starters-bulbasaur">Bulbasaur</label>
		</div>
		<div>
			<input
				type="checkbox"
				name="starters"
				value="pikachu"
				bind:group={starters}
				id="f-starters-pikachu"
				aria-invalid={hasError('starters', form)}
				aria-errormessage="f-starters-error-messages"
			/>
			<label for="f-starters-pikachu">Pikachu</label>
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
		<button type="submit" class="btn" disabled={submitting}>Submit</button>
	</div>
</form>
