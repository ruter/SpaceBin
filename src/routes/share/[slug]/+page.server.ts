import type { PageServerLoad, Actions } from "./$types";
import { pastes } from "$lib/server/db";
import { error, fail } from "@sveltejs/kit";
import type { Paste, Password, PasteResponse } from "$lib/types";

export const load = (async (event) => {
  const res = await pastes.fetch({ slug: event.params.slug }, { limit: 1 });
  if (!res.count) {
    throw error(404, { message: "This paste has been expired!" });
  }

  let paste = res.items[0] as Paste;

  if (paste.passwordProtected) {
    paste = {
      ...paste,
      content: "",
      password: "",
    };
  }

  return {
    paste,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const password = {
      key: data.get("key")?.toString(),
      password: data.get("password")?.toString(),
    } as Password;

    // TODO: filter by expireTime
    const res = await pastes.fetch(password, { limit: 1 });
    if (!res.count) {
      return fail(400, { key: password.key, incorrect: true });
    }
    if (!res.count) {
      throw error(404, { message: "This paste has been expired!" });
    }

    const paste = res.items[0] as Paste;

    return { unlocked: true, paste } as PasteResponse;
  },
} satisfies Actions;
