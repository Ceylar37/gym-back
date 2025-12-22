export interface RequestWithBody<T = void> extends Request {
	json: () => Promise<T>;
}