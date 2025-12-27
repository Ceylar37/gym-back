/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseError } from "@/shared/base/base-error";

import { NextResponse } from "next/server";

function isConstructor(f: (...args: unknown[]) => unknown) {
  try {
    Reflect.construct(String, [], f);
  } catch {
    return false;
  }
  return true;
}

export function controller<T extends { new (...args: any[]): any }>(
  Class: T
): T {
  return class extends Class {
    constructor(...args: any[]) {
      super(...args);

      const methods = new Set<string>();

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let currentObj = this;
      while (currentObj.constructor.name !== "BaseController") {
        // Get all own property names (enumerable and non-enumerable)
        const ownKeys = Object.getOwnPropertyNames(currentObj);
        // Filter out duplicates and add new keys
        ownKeys.forEach((key) => {
          if (
            typeof (currentObj as any)[key] === "function" &&
            !isConstructor((currentObj as any)[key])
          ) {
            methods.add(key);
          }
        });
        // Move up the prototype chain
        currentObj = Object.getPrototypeOf(currentObj);
      }
      // Wrap each method with error handling
      methods.forEach((key) => {
        const originalMethod = (this as any)[key];
        if (typeof originalMethod === "function") {
          (this as any)[key] = async (...args: any[]) => {
            try {
              return await originalMethod.apply(this, args);
            } catch (error) {
              if (error instanceof BaseError) {
                return NextResponse.json(error.message, {
                  status: error.status,
                });
              }
              throw error;
            }
          };
          (this as any)[key] = (this as any)[key].bind(this);
        }
      });
    }
  } as T;
}
