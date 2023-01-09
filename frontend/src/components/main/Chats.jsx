import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

import Channels from './components/channels/Channels.jsx';
import Chat from './components/chat/Chat.jsx';
import { fetchData, selectLoadingStatus } from '../../slices/components/channelsSlice';

const Chats = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectLoadingStatus);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {loadingStatus
        ? <Oval />
        : (
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Chat />
          </div>
        )}
    </div>
  );
};

export default Chats;
