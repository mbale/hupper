import messageBus from "../../message-bus";
import { MessageKey } from "../../message-bus/keys";
import { BlockedUser } from "../../settings/blocked-users/types";

/**
 * Singe entry point whenever a blog post is mounted into DOM
 */
const blogPostHook = async () => {
  const observer = new MutationObserver(async (mutations) => {
    const { result: blockedUsers } = await messageBus.sendMessage<
      BlockedUser[]
    >(MessageKey.GetBlockedUserList, null);

    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        const htmlElement = node as HTMLElement;
        const isBlogPost =
          htmlElement.tagName === "ARTICLE" &&
          htmlElement.getAttribute("role") === "article";

        if (isBlogPost) {
          // get user info
          const userInfoNode = htmlElement.querySelector('[typeof="schema:Person"]')
          // about=/user/$id
          const userId = userInfoNode?.getAttribute('about')?.split('/')[2]
          const parsedId = userId ? parseInt(userId, 10) : null
          const userIsBlocked = !!(blockedUsers?.find(({ id }) => id === parsedId)) ?? false

          if (userIsBlocked) {
            htmlElement.style.display = 'none'
          }
        }
      });
    });
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};

export default blogPostHook;
