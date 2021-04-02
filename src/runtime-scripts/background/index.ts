import messageBus from '../../message-bus';
import { BlockedUser, BLOCKED_USERS_PERSIST_KEY } from '../../settings/blocked-users/slice';
import { persistDataLayer } from '../../utils'
import { MessageKey } from '../../message-bus/message-keys'

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