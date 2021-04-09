import messageBus, { MessageKey } from '../../message-bus';
import { UI_BLOCKED_USERS_PERSIST_KEY } from '../../settings/blocked-users/slice';
import { BlockedUser } from '../../settings/blocked-users/types';
import { UISettingsState } from '../../settings/ui/types';
import { UI_SLICE_PERSIST_KEY } from '../../settings/ui/slice';
import { persistDataLayer } from '../../utils'

// get blocked users
messageBus.addListener<BlockedUser[]>(MessageKey.GetBlockedUserList, async() => {
  const result = await persistDataLayer.getItem<BlockedUser[]>(UI_BLOCKED_USERS_PERSIST_KEY)

  return result
})

// set blocked user
messageBus.addListener<BlockedUser>(MessageKey.BlockUser, async({ data }) => {
  const list = await persistDataLayer.getItem<BlockedUser[]>(UI_BLOCKED_USERS_PERSIST_KEY) || []
  const exists = list.find(i => i.id === data.id)

  if (!exists) {
    await persistDataLayer.setItem(UI_BLOCKED_USERS_PERSIST_KEY, list.concat(data));
  }

  return true
})

// get ui settings
messageBus.addListener<UISettingsState>(MessageKey.GetUISettings, async() => {
  const uiSettings = await persistDataLayer.getItem<UISettingsState>(UI_SLICE_PERSIST_KEY)

  return uiSettings
})