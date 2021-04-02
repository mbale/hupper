import { combineReducers, configureStore } from "@reduxjs/toolkit";
import blockedUsersSlice, { initPersistedState } from './settings/blocked-users/slice'

const reducer = combineReducers({
  blockedUsersSlice
});

const createStore = (state?: RootState) => {
  const store = configureStore({
    reducer,
    preloadedState: {}
  });

  return store;
};

const store = createStore()

export type RootState = ReturnType<typeof reducer>
export default store;
