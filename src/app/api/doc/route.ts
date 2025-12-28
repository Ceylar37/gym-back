import { activeTrainingContract } from "@/modules/active-training";
import { authContract } from "@/modules/auth";
import { exerciseTypeContract } from "@/modules/exercise-type/model";
import { trainingContract } from "@/modules/training/model";
import { trainingHistoryContract } from "@/modules/training-history/model";
import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";

import packageJson from "../../../../package.json";

import "swagger-ui-react/swagger-ui.css";

import { NextResponse } from "next/server";

const contract = initContract().router({
  auth: authContract,
  "exercise-type": exerciseTypeContract,
  training: trainingContract,
  "active-training": activeTrainingContract,
  "training-history": trainingHistoryContract,
});

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Auth API",
    version: packageJson.version,
  },
});

export const GET = () => NextResponse.json(openApiDocument);
