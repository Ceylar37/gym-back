import jwt, { SignOptions } from "jsonwebtoken";

export const sign = (payload: object, key: string, signOptions: SignOptions) =>
  jwt.sign(payload, key, signOptions);
export const verify = (token: string, key: string) => {
  try {
    return jwt.verify(token, key);
  } catch {
    return false;
  }
};
