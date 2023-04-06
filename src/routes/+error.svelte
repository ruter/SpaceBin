<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>{$page.status} | SpaceBin</title>
</svelte:head>

<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 sm:rounded-lg">
  <div class="text-center">
    <p class="text-base font-semibold text-fuchsia-500">{$page.status}</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      {$page.error?.message}
    </h1>
    {#if $page.status === 404}
      <p class="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
    {/if}
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a
        href="/"
        class="rounded-md bg-fuchsia-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >Go back home</a>
    </div>
  </div>
</main>
