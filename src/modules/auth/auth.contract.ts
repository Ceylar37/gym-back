import z from "zod";

export const authContract = {
  login: z.object({ email: z.string(), password: z.string() }),
  register: z.object({ email: z.string(), password: z.string() }),
  refresh: z.object({ refreshToken: z.string() }),
};
