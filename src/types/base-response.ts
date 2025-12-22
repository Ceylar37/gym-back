export class BaseResponse extends Response {
  constructor(body?: unknown, init?: ResponseInit) {
    const instances = [
      ReadableStream,
      ArrayBuffer,
      Blob,
      FormData,
      URLSearchParams,
    ];
    const serializedBody = !(
      instances.some((instance) => body instanceof instance) ||
      typeof body === "string"
    )
      ? JSON.stringify(body)
      : (body as BodyInit);

    super(serializedBody, init);
  }
}
