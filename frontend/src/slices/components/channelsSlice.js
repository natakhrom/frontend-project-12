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
  async (token) => {
    const { data } = await axios.get(routes.chatsPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();
const defaultId = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultId,
  changeableChannel: null,
  loadingStatus: 'idle',
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = defaultId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    updateChannel: channelsAdapter.upsertOne,
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setChangeableChannel: (state, { payload }) => {
      state.changeableChannel = payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
        state.loadingStatus = 'loaded';
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const selectCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectLoadingStatus = (state) => state.channels.loadingStatus;
export const selectChangeableChannel = (state) => state.channels.changeableChannel;
export const selectError = (state) => state.channels.error;

export const selectCurrentChannel = createSelector(
  selectCurrentChannelId,
  (state) => state.channels.entities,
  (currentChannelId, entities) => entities[currentChannelId],
);

export const {
  addChannel,
  removeChannel,
  updateChannel,
  changeCurrentChannel,
  setChangeableChannel,
  clearError,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
