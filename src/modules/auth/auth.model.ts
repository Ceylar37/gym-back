import z from "zod";

export const authContract = {
  login: {
    body: z.object({ email: z.string(), password: z.string() }).strict(),
  },
  register: {
    body: z.object({ email: z.string(), password: z.string() }).strict(),
  },
  refresh: {
    body: z.object({ refreshToken: z.string() }).strict(),
  },
};
