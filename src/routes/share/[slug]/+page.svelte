<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { page } from "$app/stores";
  import { dtf } from "$lib/time";
  import type { Paste } from "$lib/types";
  import {
    CalendarIcon,
    ClipboardCopyIcon,
    DocumentTextIcon,
    EyeIcon,
    InformationCircleIcon,
    KeyIcon,
    LinkIcon,
  } from "@rgossiaux/svelte-heroicons/outline";
  import CodeMirror from "svelte-codemirror-editor";
  import PasswordModal from "$lib/components/PasswordModal.svelte";
  import { getSyntaxLang } from "$lib/options";
  import { onMount } from "svelte";

  export let data: PageData;
  export let form: ActionData;

  let lang: any = null;
  let isModalOpen = false;

  $: paste = form?.paste || (data.paste as Paste);
  $: unlocked = form?.unlocked || !paste.passwordProtected;
  $: pasteContent = paste.content;
  $: {
    (async () => {
      lang = await getSyntaxLang(paste.syntax);
    })();
  }

  onMount(() => {
    if (!unlocked) {
      isModalOpen = true;
    }
  });
</script>

<div>
  {#if !unlocked}
    <PasswordModal bind:isOpen={isModalOpen} key={paste.key} {form} />
  {/if}
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="flex justify-between px-4 py-5 sm:px-6 border-b border-gray-300">
      <h3 class="inline-flex items-center text-base font-bold leading-6 text-gray-600">
        <DocumentTextIcon class="mr-1.5 h-5 w-5" />{paste.title}
      </h3>
      <button
        type="button"
        class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
        class:hidden={unlocked}
        on:click={() => (isModalOpen = true)}>
        <KeyIcon class="mr-1.5 h-4 w-4 text-white" />
        Unlock
      </button>
      <div class="md:inline-flex items-center hidden">
        <div
          class="cursor-pointer inline-block h-8 w-8 mr-4 rounded-md ring-white bg-indigo-200"
          title={paste.syntax || "Plaintext"}
        >
          <InformationCircleIcon class="p-1 text-indigo-600" />
        </div>
        <div
          class="cursor-pointer inline-block h-8 w-8 mr-4 rounded-md ring-white bg-indigo-200"
          title={`Created at: ${dtf(new Date(paste.createdAt))}`}
        >
          <CalendarIcon class="p-1 text-indigo-600" />
        </div>
        <div
          class="cursor-pointer inline-block h-8 w-8 mr-4 rounded-md ring-white bg-indigo-200"
          title={`Views: ${paste.view}`}
        >
          <EyeIcon class="p-1 text-indigo-600" />
        </div>
      </div>
    </div>

    <div class="space-y-12">
      <div class="border-b border-gray-900/10">
        <div class="col-span-full p-4">
          <label for="content" class="block text-sm font-medium leading-6 text-gray-500"
            >Content</label>
          <div class="mt-2">
            <div class="block w-full border text-gray-900 shadow-sm sm:text-sm sm:leading-6">
              <CodeMirror
                bind:value={pasteContent}
                {lang}
                styles={{
                  "&": {
                    width: "100%",
                    maxWidth: "100%",
                    height: "30rem",
                  },
                }}
                readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 flex items-center justify-center gap-x-6">
      <button
        type="button"
        on:click={() => navigator.clipboard.writeText($page.url.href)}
        class="rounded-full bg-indigo-200 p-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        title="Copy Link">
        <LinkIcon class="h-6 w-6" />
      </button>

      <button
        type="button"
        on:click={() => navigator.clipboard.writeText(pasteContent)}
        class="rounded-full bg-indigo-200 p-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        title="Copy Content">
        <ClipboardCopyIcon class="h-6 w-6" />
      </button>
    </div>
  </div>
</div>
