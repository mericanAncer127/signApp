import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SignElement } from "../types";

interface EventsState {
  signs: SignElement[];
}

const initialState: EventsState = {
  signs: [],
};

const signSlice = createSlice({
  name: "signs",
  initialState,
  reducers: {
    createSign: (state, action: PayloadAction<SignElement>) => {
      state.signs.push(action.payload);
    },
    updateSign: (state, action: PayloadAction<SignElement>) => {
      if (state.signs) {
        state.signs = state.signs.map((sign) =>
          sign.id === action.payload.id ? action.payload : sign
        );
      }
    },
    deleteSign: (state, action: PayloadAction<number>) => {
      if (state.signs) {
        state.signs = state.signs.filter(
          (sign: any) => sign.id !== action.payload
        );
      }
    },
  },
});

export const { createSign, updateSign, deleteSign } = signSlice.actions;

export default signSlice.reducer;
