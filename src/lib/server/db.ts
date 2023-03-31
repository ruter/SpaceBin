import { Deta } from "deta";

const DETA_PROJECT_KEY = process.env.DETA_PROJECT_KEY || "key"

const deta = Deta(DETA_PROJECT_KEY);

const pastes = deta.Base("pastes");

export { pastes };
