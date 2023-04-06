import type { PageServerLoad, Actions } from "./$types";
import { getPasteDB } from "$lib/server/db";
import { error, fail } from "@sveltejs/kit";
import type { Paste, Password, PasteResponse } from "$lib/types";

const updateViews = async (paste: Paste) => {
  const pastes = getPasteDB();
  pastes.update({view: paste.view}, paste.key)
}

export const load = (async (event) => {
  const res = await getPasteDB().fetch({ slug: event.params.slug }, { limit: 1 });
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
  } else {
    paste.view++;
    updateViews(paste);
  }

  return {
    paste,
    title: `${paste.title} | SpaceBin`,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const password = {
      key: data.get("key")?.toString(),
      password: data.get("password")?.toString(),
    } as Password;

    const res = await getPasteDB().fetch(password, { limit: 1 });
    if (!res.count) {
      return fail(400, { key: password.key, incorrect: true });
    }

    const paste = res.items[0] as Paste;

    paste.view++;
    updateViews(paste);

    return { unlocked: true, paste } as PasteResponse;
  },
} satisfies Actions;
