import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './components/channelsSlice';
import messagesReducer from './components/messagesSlice';
import modalReducer from './components/modalSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
