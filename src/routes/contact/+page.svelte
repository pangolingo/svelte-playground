<script lang="ts">
	export let form;
	export let data;

	export let message = '';
	if (form?.errors?.values.message) {
		message = form?.errors?.values.message as string;
	}

	const errorsList = (key: string): string[] => {
		return form?.errors?.messages[key] ?? [];
	};
	const hasError = (key: string): boolean => {
		return (form?.errors?.messages[key] ?? []).length > 0;
	};
</script>

<h2 class="h2 mb-2">Contact me</h2>

<form method="post" class="space-y-4 max-w-[16rem]">
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
			{#each errorsList('name') ?? [] as message}
				<p class="input-error-message">{message}</p>
			{/each}
		</div>
		<input
			type="text"
			name="name"
			id="f-name"
			class="input"
			required
			aria-invalid={hasError('name')}
			value={form?.errors?.values.name ?? data.session?.user?.name ?? ''}
			aria-describedby="f-name-error-messages"
		/>
	</div>

	<div class="input-container">
		<label for="f-email" class="input-label">Email</label>
		<div id="f-email-error-messages">
			{#each errorsList('email') ?? [] as message}
				<p class="input-error-message">{message}</p>
			{/each}
		</div>
		<input
			type="email"
			name="email"
			id="f-email"
			class="input"
			required
			aria-invalid={hasError('email')}
			value={form?.errors?.values.email ?? data?.session?.user?.email ?? ''}
			aria-describedby="f-email-error-messages"
		/>
	</div>

	<fieldset
		class="input-container"
		aria-invalid={hasError('colors')}
		aria-describedby="f-colors-error-messages"
	>
		<legend class="input-label">Favorite colors</legend>
		<div id="f-colors-error-messages">
			{#each errorsList('colors') ?? [] as message}
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
			/>
			<label for="f-colors-red">Red</label>
		</div>
	</fieldset>

	<div class="input-container">
		<label for="f-message" class="input-label">Message</label>
		<div id="f-message-error-messages">
			{#each errorsList('message') ?? [] as message}
				<p class="input-error-message">{message}</p>
			{/each}
		</div>
		<textarea
			class="input"
			name="message"
			id="f-message"
			rows="3"
			aria-invalid={hasError('message')}
			aria-describedby="f-message-error-messages"
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
