import {
  HandlerRequestContext,
  HandlerSignature,
  MessageListenerArgs,
  MessageResponse,
} from "./types";

/**
 * To create a proxy object that sorts out messages to the correct listeners
 *
 * @template T
 * @param {T} targetObject
 * @param {Map<string, HandlerSignature>} handlerRegistry
 * @returns {T}
 */
function createProxy<T extends Object>(
  target: T,
  handlerRegistry: Map<string, HandlerSignature>
): T {
  const proxy = new Proxy<T>(target, {
    apply: function (_target, _thisScope, args: MessageListenerArgs) {
      const [messageRequest, sender, sendResponse] = args;
      const { correlationId, data } = messageRequest;

      if (!correlationId) {
        throw new Error("Missing correlationId");
      }

      const handlerFunc = handlerRegistry.get(correlationId);

      if (!handlerFunc) {
        throw new Error(`No handler for key: ${correlationId}`);
      }

      const ctx: HandlerRequestContext = {
        data,
        sender,
      };

      try {
        handlerFunc(ctx).then((result) => {
          const successResponse: MessageResponse = {
            result,
            error: null,
          };

          sendResponse(successResponse);
        });
      } catch (error) {
        const errorResponse: MessageResponse = {
          error,
          result: null,
        };
        sendResponse(errorResponse);
      }

      // chrome message layer needs this to indicate promise
      return true;
    },
  });

  return proxy;
}

export default createProxy;
