import { render, h } from "preact";
import messageBus from "../message-bus";
import { MessageKey } from "../message-bus/message-keys";
import { BlockedUser } from "../settings/blocked-users/slice";
import BlockUserButton from "./block-user-button";

const commentHook = async () => {
  const observer = new MutationObserver(async (mutations) => {
    const { result: blockedUsers } = await messageBus.sendMessage<
      BlockedUser[]
    >(MessageKey.GetBlockedUserList, null);

    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((f) => {
        const htmlElement = f as HTMLElement;
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

            // also check for replies to remove
            const withReplies = htmlElement.nextElementSibling?.classList.contains(
              "indented"
            );

            if (withReplies) {
              (htmlElement.nextElementSibling as HTMLElement).style.display =
                "none";
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
