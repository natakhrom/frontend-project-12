/* eslint-disable no-param-reassign */
import axios from 'axios';

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

import routes from '../../routes/routes';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const { data } = await axios.get(routes.chatsPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  loadingStatus: true,
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      const { username } = JSON.parse(localStorage.getItem('userId'));
      if (username === payload.username) {
        state.currentChannelId = payload.id;
      }
      channelsAdapter.addOne(state, payload);
    },
    removeChannel: (state, { payload }) => {
      state.currentChannelId = 1;
      channelsAdapter.removeOne(state, payload);
    },
    updateChannel: channelsAdapter.upsertOne,
    changeCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
        state.loadingStatus = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

const selectChannels = (state) => state.channels.ids;
const selectCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectLoadingStatus = (state) => state.channels.loadingStatus;

export const selectCurrentChannel = createSelector(
  selectChannels,
  selectCurrentChannelId,
  (state) => state.channels.entities,
  (ids, currentChannelId, entities) => ids
    .filter((id) => id === currentChannelId)
    .map((i) => entities[i])[0],
);

export const {
  addChannel,
  removeChannel,
  updateChannel,
  changeCurrentChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
