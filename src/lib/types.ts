export type Paste = {
  key: string;
  title: string;
  syntax: string;
  slug: string;
  createdAt: number;
  expireTime: number;
  password?: string;
  passwordProtected: boolean;
  content: string;
  view: number;
};

export type Password = {
  key: string;
  password: string;
};

export type PasteResponse = {
  unlocked: boolean;
  paste: Paste;
};
