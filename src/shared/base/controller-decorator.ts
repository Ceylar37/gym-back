/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResponse } from "@/types/base-response";

import { BaseController } from "./base.controller";
import { BaseError } from "./base-error";

export function controllerDecorator<
  T extends { new (...args: any[]): BaseController }
>(Class: T): T {
  return class extends Class {
    constructor(...args: any[]) {
      super(...args);

      // Get all property names from instance and prototype
      const keys = [
        ...Object.getOwnPropertyNames(this),
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(this)),
      ];

      // Filter for methods (excluding constructor)
      const methods = keys.filter(
        (key) =>
          typeof (this as any)[key] === "function" && key !== "constructor"
      );

      // Wrap each method with error handling
      methods.forEach((key) => {
        const originalMethod = (this as any)[key];
        if (typeof originalMethod === "function") {
          (this as any)[key] = async (...args: any[]) => {
            try {
              return await originalMethod.apply(this, args);
            } catch (error) {
              if (error instanceof BaseError) {
                return new BaseResponse(error.message, {
                  status: error.status,
                });
              }
              throw error;
            }
          };
        }
      });
    }
  } as T;
}
