<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import {
    Dialog,
    DialogTitle,
    DialogOverlay,
    DialogDescription,
    Transition,
  } from "@rgossiaux/svelte-headlessui";

  export let form: ActionData;
  export let isOpen: boolean;
  export let key: string;
</script>

<Transition appear show={isOpen}>
  <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" on:close={() => (isOpen = false)}>
    <div class="flex flex-col min-h-screen px-4 text-center">
      <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-25 backdrop-blur" />
      <form
        class="mx-auto my-8 inline-block w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all dark:bg-black sm:align-middle"
        method="post"
        use:enhance={() => {
          return async ({ update }) => {
            await update();
            if (!form.incorrect) {
              isOpen = false;
            }
          };
        }}>
        <DialogTitle class="text-2xl font-semibold">Password</DialogTitle>
        <DialogDescription class="text-gray-500 text-center">
          To unlock this paste, please enter password
        </DialogDescription>
        <div class="w-full mt-2">
          <input
            type="password"
            name="password"
            id="password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6" />
          <input type="hidden" name="key" id="key" value={key} />
        </div>
        {#if form?.incorrect}
          <p class="mt-2 p-2 text-fuchsia-600 bg-fuchsia-200 rounded-md">
            Please enter valid password
          </p>
        {/if}

        <div class="flex justify-end mt-2">
          <button
            type="button"
            on:click={() => (isOpen = false)}
            class="mr-2 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Close</button>
          <button
            type="submit"
            class="rounded-md bg-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
            >Unlock</button>
        </div>
      </form>
    </div>
  </Dialog>
</Transition>
