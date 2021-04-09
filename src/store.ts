import { combineReducers, configureStore } from "@reduxjs/toolkit";
import blockedUsersSlice from "./settings/blocked-users/slice";
import settingsRouterSlice from "./settings/slice";
import uiSettingsSlice from "./settings/ui/slice";

const reducer = combineReducers({
  settingsRouterSlice,
  blockedUsersSlice,
  uiSettingsSlice
});

const createStore = (state?: RootState) => {
  const store = configureStore({
    reducer,
    preloadedState: {},
  });

  return store;
};

export type RootState = ReturnType<typeof reducer>;
export default createStore();
