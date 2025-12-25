import z from "zod";

export const authContract = {
  login: {
    body: z.object({ email: z.string(), password: z.string() }),
  },
  register: {
    body: z.object({ email: z.string(), password: z.string() }),
  },
  refresh: {
    body: z.object({ refreshToken: z.string() }),
  },
};
