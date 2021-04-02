
export interface HandlerRequestContext<T = unknown> {
  data: T;
  sender: chrome.runtime.MessageSender;
}

export type HandlerSignature<P = unknown, R = object | unknown> = (ctx: HandlerRequestContext<P>) => PromiseLike<R>;

export interface MessageResponse<T = unknown> {
  result: T | null;
  error: Error | null;
}

export interface MessageRequest<T = unknown> {
  data: T;
  correlationId: MessageCorrelationId;
}

export type MessageCorrelationId = string;
export type MessageListenerArgs = [MessageRequest, chrome.runtime.MessageSender, Function]