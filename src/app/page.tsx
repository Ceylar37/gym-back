import { openApiDocument } from "./api/doc/route";

import "swagger-ui-react/swagger-ui.css";

import SwaggerUI from "swagger-ui-react";

export default async function Home() {
  return <SwaggerUI spec={openApiDocument} />;
}
