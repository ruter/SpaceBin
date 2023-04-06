import type { Actions, PageServerLoad } from "./$types";
import { getPasteDB } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { Paste } from "$lib/types";
import { nanoid } from "nanoid";

export const load = (async (event) => {
  return {
    title: "SpaceBin",
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    let paste = {
      key: nanoid(),
      title: data.get("title")?.toString() || "Untitled",
      description: data.get("description")?.toString(),
      syntax: data.get("syntax")?.toString(),
      slug: nanoid(6),
      createdAt: Date.now(),
      expireTime: parseInt(data.get("expireTime")?.toString() || "0"),
      password: data.get("password")?.toString(),
      passwordProtected: !!data.get("password")?.toString(),
      content: data.get("content"),
      view: 0,
    } as Paste;

    let options = {};
    if (!!paste.expireTime) {
      options = { expireIn: Math.round(paste.expireTime / 1000) };
    }
    await getPasteDB().put(paste, paste.key, options);

    throw redirect(303, `/share/${paste.slug}`);
  },
} satisfies Actions;
