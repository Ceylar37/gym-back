import { NextRequest, NextResponse } from "next/server";

if (!process.env.ALLOWED_ORIGINS)
  throw new Error("ALLOWED_ORIGINS is not defined");
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",").map(
  (origin) => `${origin}/`
);

export const withCors = <Request extends NextRequest>(
  cb: (req: Request) => Promise<NextResponse>
) => {
  return async (req: Request) => {
    const response = await cb(req);

    if (allowedOrigins.includes(req.headers.get("Referer") || "")) {
      response.headers.set(
        "Access-Control-Allow-Origin",
        req.headers.get("Referer")?.slice(0, -1) || ""
      );
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET,DELETE,PATCH,POST,PUT"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
      );
    }
    return response;
  };
};
