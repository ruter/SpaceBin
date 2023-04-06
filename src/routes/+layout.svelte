<script lang="ts">
  import "../app.css";
  import { DocumentAddIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>

<div class="flex flex-col min-h-full">
  <nav class="bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <a href="/"><img class="h-10 w-10" src="/icon.svg" alt="SpaceBin" /></a>
          </div>
        </div>
        <div>
          <div class="ml-4 flex items-center md:ml-6">
            <a
              href="/"
              class="inline-flex items-center rounded-md bg-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
              ><DocumentAddIcon class="mr-1.5 h-5 w-5 text-white" />New Paste</a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <slot />
    </div>
  </main>

  <footer class="bg-white mt-auto">
    <div class="mx-auto max-w-7xl py-4">
      <div class="flex flex-col sm:flex-row items-center justify-center text-base text-gray-500">
        <span>© {new Date().getFullYear()} SpaceBin All rights reserved</span>
        <span class="hidden sm:block mx-1.5">|</span>
        <a href="/" target="_blank">
          <img
            class="h-auto w-36"
            src="https://deta.space/buttons/dark.svg"
            alt="Install on Deta Space" />
        </a>
      </div>
    </div>
  </footer>
</div>
