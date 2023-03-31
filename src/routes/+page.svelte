<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { DocumentAddIcon, CogIcon, CheckIcon } from "@rgossiaux/svelte-heroicons/outline";
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@rgossiaux/svelte-headlessui";
  import { expirationOptions, syntaxOptions, getSyntaxLang } from "$lib/options";

  let value = "";
  let lang: any = null;
  let selectedSyntax = syntaxOptions[0];
  let selectedExpiration = expirationOptions[0];

  $: syntax = selectedSyntax.value;
  $: expireTime = selectedExpiration.ms;
  $: {
    (async () => {
      lang = await getSyntaxLang(syntax);
    })();
  }
</script>

<div class="overflow-hidden bg-white shadow sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6 border-b border-gray-300">
    <h3 class="inline-flex items-center text-base font-bold leading-6 text-gray-600">
      <DocumentAddIcon class="mr-1.5 h-5 w-5" />New Paste
    </h3>
  </div>

  <form method="POST">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="col-span-full p-4">
          <label for="content" class="block text-sm font-medium leading-6 text-gray-500"
            >Content</label>
          <div class="mt-2">
            <div class="block w-full border text-gray-900 shadow-sm sm:text-sm sm:leading-6">
              <CodeMirror
                bind:value
                {lang}
                styles={{
                  "&": {
                    width: "100%",
                    maxWidth: "100%",
                    height: "25rem",
                  },
                }} />
              <input type="hidden" name="content" bind:value />
            </div>
          </div>
        </div>

        <div class="col-span-full p-4">
          <div class="relative flex items-center">
            <div class="flex-grow border-t border-gray-400" />
            <span class="inline-flex items-center flex-shrink mx-4 text-gray-500"
              ><CogIcon class="mr-1.5 h-5 w-5" />Optional Paste Settings</span>
            <div class="flex-grow border-t border-gray-400" />
          </div>
        </div>

        <div class="col-span-full p-4">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-500"
                >Title</label>
              <div class="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autocomplete="given-title"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-500"
                >Password</label>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="syntax" class="block text-sm font-medium leading-6 text-gray-500"
                >Syntax Highlighting</label>
              <div class="mt-2">
                <Listbox value={syntaxOptions} on:change={(e) => (selectedSyntax = e.detail)}>
                  <ListboxButton
                    class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 sm:text-sm sm:leading-6">
                    {selectedSyntax.name}
                    <span
                      class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-400">
                        <path
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd" />
                      </svg>
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    class="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {#each syntaxOptions as option (option.id)}
                      <ListboxOption
                        value={option}
                        class={({ active }) =>
                          active
                            ? "text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 bg-fuchsia-100"
                            : "text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"}
                        let:selected>
                        <div class="flex items-center">
                          {#if selected}
                            <CheckIcon class="h-5 w-5 flex-shrink-0 text-fuchsia-400" />
                          {/if}
                          <span class="font-normal ml-3 block truncate">{option.name}</span>
                        </div>
                      </ListboxOption>
                    {/each}
                  </ListboxOptions>
                </Listbox>
                <input type="hidden" name="syntax" bind:value={syntax} />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="expiration" class="block text-sm font-medium leading-6 text-gray-500"
                >Paste Expiration</label>
              <div class="mt-2">
                <Listbox
                  value={selectedExpiration}
                  on:change={(e) => (selectedExpiration = e.detail)}>
                  <ListboxButton
                    class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 sm:text-sm sm:leading-6">
                    {selectedExpiration.name}
                    <span
                      class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-400">
                        <path
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd" />
                      </svg>
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    class="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {#each expirationOptions as option (option.id)}
                      <ListboxOption
                        value={option}
                        class={({ active }) =>
                          active
                            ? "text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 bg-fuchsia-100"
                            : "text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"}
                        let:selected>
                        <div class="flex items-center">
                          {#if selected}
                            <CheckIcon class="h-5 w-5 flex-shrink-0 text-fuchsia-400" />
                          {/if}
                          <span class="font-normal ml-3 block truncate">{option.name}</span>
                        </div>
                      </ListboxOption>
                    {/each}
                  </ListboxOptions>
                </Listbox>
                <input type="hidden" name="expireTime" bind:value={expireTime} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="rounded-md bg-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >Save</button>
    </div>
  </form>
</div>
