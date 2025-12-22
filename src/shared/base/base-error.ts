import { ErrorCode } from "./error-code";

export class BaseError extends Error {
  public status: number;

  constructor(message: ErrorCode, status: number) {
    super(String(message));
    this.status = status;
  }
}
