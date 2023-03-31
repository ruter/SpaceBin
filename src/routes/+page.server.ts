import type { Actions } from "./$types";
import { pastes } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { Paste } from "$lib/types";
import { nanoid } from "nanoid";

// export const ssr = false;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    let paste = {
      key: nanoid(),
      title: data.get("title")?.toString(),
      description: data.get("description")?.toString(),
      syntax: data.get("syntax")?.toString(),
      slug: nanoid(),
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
    await pastes.put(paste, paste.key, options);

    throw redirect(303, `/share/${paste.slug}`);
  },
} satisfies Actions;
