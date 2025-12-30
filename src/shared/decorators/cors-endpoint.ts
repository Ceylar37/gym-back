import { withCors } from "./with-cors";

import { NextRequest, NextResponse } from "next/server";

enum Method {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
}

type Endpoint = Partial<
  Record<Method, (req: NextRequest) => Promise<NextResponse>>
>;

export const corsEndpoint = <E extends Endpoint>(
  endpoint: E
): E & { [Method.OPTIONS]: (req: NextRequest) => Promise<NextResponse> } => {
  const corsEndpoint = {} as E;

  Object.entries(endpoint).forEach(([key, value]) => {
    corsEndpoint[key as Method] = withCors(value);
  });

  if (!corsEndpoint["OPTIONS"]) {
    corsEndpoint["OPTIONS"] = withCors(async () => {
      return new NextResponse(undefined, { status: 204 });
    });
  }

  return corsEndpoint as E & {
    [Method.OPTIONS]: (req: NextRequest) => Promise<NextResponse>;
  };
};
