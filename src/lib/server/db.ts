import { Deta } from "deta";
import { env } from "$env/dynamic/private";

const deta = Deta(env.DETA_PROJECT_KEY);

const pastes = deta.Base("pastes");

export { pastes };
