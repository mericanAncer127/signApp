import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MyEvent } from "../types";

interface EventsState {
  events: MyEvent[];
}

const initialState: EventsState = {
  events: [],
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    createEvent: (state, action: any) => {
      state.events.push(action.payload);
    },
    readEvents: (state, action: any) => {
      state.events = action.payload;
    },
    updateEvent: (state, action: any) => {
      if (state.events) {
        state.events = state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        );
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      if (state.events) {
        state.events = state.events.filter(
          (event: any) => event.id !== action.payload
        );
      }
    },
  },
});

export const { createEvent, readEvents, updateEvent, deleteEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
