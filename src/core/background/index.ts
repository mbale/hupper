import messageBus, { MessageKey } from '../../message-bus';
import { BLOCKED_USERS_PERSIST_KEY } from '../../settings/blocked-users/slice';
import { BlockedUser } from '../../settings/blocked-users/types';
import { persistDataLayer } from '../../utils'

// get blocked users
messageBus.addListener<BlockedUser[]>(MessageKey.GetBlockedUserList, async(_) => {
  const result = await persistDataLayer.getItem<BlockedUser[]>('blocked-users')

  return result
})

// set blocked user
messageBus.addListener<BlockedUser>(MessageKey.BlockUser, async({ data }) => {
  const list = await persistDataLayer.getItem<BlockedUser[]>('blocked-users') || []
  const exists = list.find(i => i.id === data.id)

  if (!exists) {
    await persistDataLayer.setItem(BLOCKED_USERS_PERSIST_KEY, list.concat(data));
  }

  return true
})