import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "./types";

export enum View {
  BlockedUsers,
  UI
}

const initialState: SettingsState = {
  activeView: View.BlockedUsers
};

export const {
  actions: { changeView },
  reducer,
} = createSlice({
  name: "settingsRouter",
  initialState,
  reducers: {
    changeView(state, { payload }: PayloadAction<View>) {
      state.activeView = payload
    },
  },
});

export default reducer;
