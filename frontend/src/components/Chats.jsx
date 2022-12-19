import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import socket from '../socket/socket';

import ChannelContext from '../context/channelContext';
import routes from '../routes.js';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice';

const Chats = () => {
  const dispatch = useDispatch();
  const [currentChannel, setCurrentChannel] = useState({});
  const { username } = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchData = async () => {
      const { token } = JSON.parse(localStorage.getItem('userId'));
      const { data } = await axios.get(routes.chatsPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { channels, messages, currentChannelId } = data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      const selectedChannel = channels.find((ch) => ch.id === currentChannelId);
      setCurrentChannel(selectedChannel);

      socket.on('connect', () => console.log(socket.connected));
      socket.on('newChannel', (payload) => {
        dispatch(channelsActions.addChannel(payload));
        setCurrentChannel(payload);
      });
      socket.on('removeChannel', (payload) => {
        dispatch(channelsActions.removeChannel(payload.id));
        setCurrentChannel(selectedChannel);
      });
      socket.on('renameChannel', (payload) => {
        dispatch(channelsActions.updateChannel(payload));
        setCurrentChannel(payload);
      });
    };

    fetchData();
  }, [dispatch, setCurrentChannel]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelContext.Provider value={currentChannel}>
          <Channels
            setCurrentChannel={setCurrentChannel}
          />
          <Chat
            username={username}
          />
        </ChannelContext.Provider>
      </div>
    </div>
  );
};

export default Chats;
