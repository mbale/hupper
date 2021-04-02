import { render, h } from "preact";
import messageBus, { MessageKey } from "../../message-bus";
import { BlockedUser } from "../../settings/blocked-users/types";
import BlockUserButton from "../../block/block-user-button";

/**
 * Singe entry point whenever a comment is mounted into DOM
 */
const commentHook = async () => {
  const observer = new MutationObserver(async (mutations) => {
    const { result: blockedUsers } = await messageBus.sendMessage<
      BlockedUser[]
    >(MessageKey.GetBlockedUserList, null);

    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        const htmlElement = node as HTMLElement;
        const isComment =
          htmlElement.tagName === "ARTICLE" &&
          htmlElement.getAttribute("typeof") === "schema:Comment";

        if (isComment) {
          // check if comment needs to be removed, also parse data
          const commentUserIdAttr = htmlElement.getAttribute(
            "data-comment-user-id"
          );
          const commentUserId = commentUserIdAttr
            ? parseInt(commentUserIdAttr, 10)
            : null;
          const commentUsername = (htmlElement.querySelector(
            '[property="schema:name"]'
          ) as HTMLElement)?.innerHTML;
          const commentInfoContainer = htmlElement.querySelector(
            ".comment_info_wrapper"
          ) as HTMLElement;
          const userIsBlocked = !!blockedUsers?.find(
            ({ id }) => id === commentUserId
          );

          // mount ui block component
          if (commentInfoContainer) {
            // make the two thousand old theme actually responsive
            commentInfoContainer.style.display = "flex";

            render(
              h(BlockUserButton, { id: commentUserId, name: commentUsername }),
              commentInfoContainer
            );
          }

          // remove if needed
          if (userIsBlocked) {
            htmlElement.setAttribute("hr-blocked-user", "true");
            htmlElement.style.display = "none";

            const nextElement = htmlElement.nextElementSibling as HTMLElement;

            // also check for replies to remove
            const withReplies = nextElement?.classList.contains("indented");

            if (withReplies) {
              nextElement.style.display = "none";
            }
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

export default commentHook;
