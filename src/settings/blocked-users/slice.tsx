import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistDataLayer } from "../../utils";
import { BlockedUser, BlockedUsersState } from './types'

const dataLayer = new PersistDataLayer();

export const BLOCKED_USERS_PERSIST_KEY = 'blocked-users';

const initialState: BlockedUsersState = {
  list: [],
};

export const {
  actions: { addBlockedUser, removeBlockedUser, setInitialData },
  reducer,
} = createSlice({
  name: "blockedUsers",
  initialState,
  reducers: {
    setInitialData(state, { payload }: PayloadAction<BlockedUser[]>) {
      if (Array.isArray(payload)) {
        state.list = state.list.concat(payload)
      }
    },
    addBlockedUser(state, { payload }: PayloadAction<BlockedUser>) {
      state.list = state.list.concat(payload);
      dataLayer.setItem(BLOCKED_USERS_PERSIST_KEY, state.list);
    },
    removeBlockedUser(
      state,
      { payload: userId }: PayloadAction<BlockedUser["id"]>
    ) {
      state.list = state.list.filter((u) => u.id !== userId);
      dataLayer.setItem(BLOCKED_USERS_PERSIST_KEY, state.list);
    },
  },
});

export const initPersistedState = createAsyncThunk(
  'blockedUsers/initPersistedState',
  async (_, { dispatch }) => {
    const items = await dataLayer.getItem<BlockedUser[]>(BLOCKED_USERS_PERSIST_KEY)

    if (Array.isArray(items)) {
      dispatch(setInitialData(items))
    }
  }
)


export default reducer;
