import { Deta } from "deta";
import { env } from "$env/dynamic/private";

function getDeta() {
    return Deta(env.DETA_PROJECT_KEY);
}

export function getPasteDB() {
    return getDeta().Base("pastes");
}
