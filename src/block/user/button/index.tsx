import "preact";
import messageBus from "../../../message-bus";
import { MessageKey } from "../../../message-bus/keys";
import { BlockedUser } from "../../../settings/blocked-users/types";

const BlockUserButton = ({ id, name }) => {
  const blockUser = async () => {
    const blockedUser: BlockedUser = {
      id,
      name,
    };

    await messageBus.sendMessage(MessageKey.BlockUser, blockedUser);
  };

  return (
    <div className="flex cursor-pointer" onClick={blockUser}>
      [block]
    </div>
  );
};

export default BlockUserButton;
