export type GetRequestInput = Record<string, string>
export type Action<R = unknown> = (input: GetRequestInput) => Promise<R>
export type Actions = Record<string, Action>
