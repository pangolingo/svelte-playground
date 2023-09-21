<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";
	import type { ErrorResponse } from "./+page.server.js";

// do something on the backend with the data (save in a DB)
// style the form
// try joi or zod instead of this manual stuff, and see if we can share the validation code or joi schema both on the frontend and backend

export let form;
  let messageLength = form?.errors?.values.message?.length ?? 0
  $: messageExceedsLength = messageLength > 30

  const updateMessageLength: FormEventHandler<HTMLTextAreaElement> = (e) => {
    messageLength = e.currentTarget.value.length
  }

  const errorsList = (key: keyof ErrorResponse['messages']): string[] => {
    return form?.errors?.messages[key] ?? []
  }
  const hasError = (key: keyof ErrorResponse['messages']): boolean => {
    return (form?.errors?.messages[key].length ?? 0) > 0
  }

</script>

<h2 class="h2">Contact me</h2>

<form method="post">
  {#if form?.errors}
  <div class="bg-red-700 text-white">
    <p>Oops, we couldn't save the form.</p>
  </div>
  {/if}
  {#if form?.success}
  <div class="bg-green-700 text-white">
    <p>Thanks! We've received your message.</p>
  </div>
  {/if}

  <div class:input-container--error={hasError('name')}>
    <label for="f-name" class="input-label">Name</label>
    <input type="text" name="name" id="f-name" class="input" required value={form?.errors?.values.name ?? ''}>
    {#each errorsList('name') ?? [] as message}
      <p class="input-error">{message}</p>
    {/each}
  </div>

  <div>
    <label for="f-email" class="input-label">Email</label>
    <input type="email" name="email" id="f-email" class="input" required value={form?.errors?.values.email ?? ''}>
  </div>

  <fieldset class:input-container--error={hasError('colors')}>
    <legend class="input-label">Favorite colors</legend>
    <div>
      <input type="checkbox" name="colors" value="blue" id="f-colors-blue" checked={form?.errors?.values.colors?.includes('blue')} >
      <label for="f-colors-blue">Blue</label>
    </div>
    <div>
      <input type="checkbox" name="colors" value="green" id="f-colors-green"  checked={form?.errors?.values.colors?.includes('green')}>
      <label for="f-colors-green">Green</label>
    </div>
    <div>
      <input type="checkbox" name="colors" value="red" id="f-colors-red"  checked={form?.errors?.values.colors?.includes('red')}>
      <label for="f-colors-red">Red</label>
    </div>
    {#each errorsList('colors') ?? [] as message}
      <p class="input-error">{message}</p>
    {/each}
  </fieldset>

  <div class:input-container--error={hasError('message')}>
    <label for="f-message" class="input-label">Message</label>
    <textarea class="input" name="message" id="f-message" rows="3" on:change={updateMessageLength} on:input={updateMessageLength} required>{form?.errors?.values.message ?? ''}</textarea>
    <span class="input-hint tabular-nums" class:text-red-700={messageExceedsLength}>{messageLength}/30</span>
    {#each errorsList('message') ?? [] as message}
      <p class="input-error">{message}</p>
    {/each}
  </div>

  <div>
    <button type="submit" class="btn">Submit</button>
  </div>
</form>


