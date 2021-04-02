import createProxy from "./proxy";
import {
  HandlerSignature,
  MessageRequest,
  MessageResponse,
  MessageCorrelationId,
} from "./types";

/**
 * Wrapper over messaging for Chrome
 *
 * @class MessageBus
 */
class MessageBus {
  // watch out - shallow ref for gc
  private readonly handlerRegistry = new Map<string, HandlerSignature>();

  constructor() {
    this.checkRuntime();
    this.addProxy();
  }

  /**
   * Checks browser runtime
   *
   * @private
   * @memberof EventBus
   */
  private checkRuntime() {
    const isValidRuntime =
      typeof chrome.runtime?.onMessage !== "undefined" ?? false;

    if (!isValidRuntime) {
      throw new Error("Intended to use only in Chrome env");
    }
  }

  /**
   * Sorts out messages to handlers
   *
   * @private
   * @memberof MessageBus
   */
  private addProxy() {
    const puppetFunc = () => {};
    const proxy = createProxy(puppetFunc, this.handlerRegistry);

    chrome.runtime.onMessage.addListener(proxy);
  }

  /**
   * Add listener for messages
   *
   * @template M
   * @template R
   * @param {MessageInformation['correlationId']} correlationId
   * @param {HandlerSignature<M, R>} handlerSignature
   * @memberof EventBus
   */
  public addListener<T>(
    correlationId: MessageCorrelationId,
    handlerFunc: HandlerSignature<T>
  ) {
    const already = this.handlerRegistry.has(correlationId);

    if (already) {
      throw new Error(`Handler is already added with key: ${correlationId}`);
    }

    this.handlerRegistry.set(correlationId, handlerFunc);
  }

  /**
   * Sends message through runtime
   *
   * @template T
   * @param {MessageCorrelationId} correlationId
   * @param {object} data
   * @returns {(Promise<MessageResponse<T | null>>)}
   * @memberof MessageBus
   */
  async sendMessage<T>(
    correlationId: MessageCorrelationId,
    data: Object | null
  ): Promise<MessageResponse<T | null>> {
    return new Promise<MessageResponse<T>>((resolve, reject) => {
      const message: MessageRequest = {
        correlationId,
        data,
      };

      chrome.runtime.sendMessage(
        message,
        (messageResponse: MessageResponse<T>) => {
          const { error } = messageResponse;

          if (error) {
            return reject(error);
          }

          return resolve(messageResponse);
        }
      );
    });
  }
}

export default new MessageBus();
export { MessageBus };
