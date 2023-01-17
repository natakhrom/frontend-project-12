import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { removeChannel, fetchData } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.addMany(state, messages);
      })
      .addCase(removeChannel, (state, action) => {
        const id = action.payload;
        const removedMessages = Object.values(state.entities).filter((e) => e.channelId !== id);
        messagesAdapter.removeMany(state, removedMessages);
      });
  },
});

const selectMessages = (state) => state.messages.ids;

export const selectCurrentMessages = createSelector(
  selectMessages,
  (state) => state.channels.currentChannelId,
  (state) => state.messages.entities,
  (ids, currentChannelId, entities) => ids
    .filter((id) => entities[id].channelId === currentChannelId)
    .map((item) => entities[item]),
);

export const lastCurrentMessage = createSelector(
  selectCurrentMessages,
  (items) => items.slice(-1),
);

export const { addMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
