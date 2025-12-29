import exerciseType from "@/modules/exercise-type";

import { NextResponse } from "next/server";

export const GET = exerciseType.controller.read;
export const POST = exerciseType.controller.create;
export const PATCH = exerciseType.controller.update;
export const OPTIONS = async () => {
  return new NextResponse("", {
    status: 200,
  });
};
