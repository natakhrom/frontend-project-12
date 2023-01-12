import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

import Channels from './components/channels/Channels.jsx';
import Chat from './components/chat/Chat.jsx';
import {
  fetchData,
  selectLoadingStatus,
  selectError,
  clearError,
} from '../../slices/components/channelsSlice';
import { useAuth } from '../common/AuthProvider.js';

const Chats = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);
  const auth = useAuth();
  const { logOut } = auth;

  useEffect(() => {
    dispatch(fetchData());
    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      logOut();
    }
  }, [error, logOut]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {loadingStatus === 'loading' && <Oval />}
      {loadingStatus === 'loaded' && (
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Chat />
        </div>
      )}
    </div>
  );
};

export default Chats;
