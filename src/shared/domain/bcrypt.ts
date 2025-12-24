// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require("bcrypt");

export const hash = (password: string) => bcrypt.hash(password, 10);
export const compare = (password: string, hash: string) =>
  bcrypt.compare(password, hash);
