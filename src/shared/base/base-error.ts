import { ErrorCode } from "./error-code";

export class BaseError extends Error {
  public status: number;

  constructor(message: ErrorCode | string, status: number) {
    super(message);
    this.status = status;
  }
}
