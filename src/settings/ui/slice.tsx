import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistDataLayer } from "../../utils";
import { UISettingsState } from "./types";

const dataLayer = new PersistDataLayer();

export const UI_SLICE_PERSIST_KEY = "uiSettings";

const initialState: UISettingsState = {
  twitterBlocked: false,
};

export const {
  actions: { setInitialData, changeTwitterBlock },
  reducer,
} = createSlice({
  name: "uiSettings",
  initialState,
  reducers: {
    setInitialData(state, { payload }: PayloadAction<UISettingsState>) {
      state.twitterBlocked = payload.twitterBlocked
    },
    changeTwitterBlock(state, { payload }: PayloadAction<boolean>) {
      state.twitterBlocked = payload;
      dataLayer.setItem(UI_SLICE_PERSIST_KEY, state);
    },
  },
});

export const initPersistedState = createAsyncThunk(
  `${UI_SLICE_PERSIST_KEY}/loadPersisted`,
  async (_, { dispatch }) => {
    const items = await dataLayer.getItem<UISettingsState>(
      UI_SLICE_PERSIST_KEY
    );

    if (items) {
      dispatch(setInitialData(items))
    }
  }
);

export default reducer;
