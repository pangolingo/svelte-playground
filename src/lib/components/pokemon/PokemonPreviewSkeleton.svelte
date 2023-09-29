<script>
  import colors from 'tailwindcss/colors';
  import Loading from '../Loading.svelte';
</script>

<div class="rounded-m bg-slate-100 flex flex-col p-2 aspect-[5/7] text-center relative">
  <span class="flex-1 flex justify-center items-center">
    <div class="p-8">
      <Loading --primary-color={colors['slate'][50]} --secondary-color={colors['slate'][200]} />
    </div>
  </span>
  <div class="mb-4 h-6 w-5/6 bg-slate-200 m-auto" />
</div>
