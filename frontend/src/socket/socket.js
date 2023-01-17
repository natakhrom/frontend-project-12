import {
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import store from '../slices/index';
import { addChannel, removeChannel, updateChannel } from '../slices/components/channelsSlice';
import { addMessage } from '../slices/components/messagesSlice';

const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, socket }) => {
  socket.on('newChannel', (payload) => store.dispatch(addChannel(payload)));
  socket.on('removeChannel', (payload) => store.dispatch(removeChannel(payload.id)));
  socket.on('renameChannel', (payload) => store.dispatch(updateChannel(payload)));
  socket.on('newMessage', (payload) => store.dispatch(addMessage(payload)));

  const add = useCallback((nameChannel, username) => socket.emit(
    'newChannel',
    {
      name: nameChannel,
      username,
    },
  ), [socket]);

  const remove = useCallback((channel) => socket.emit(
    'removeChannel',
    channel,
  ), [socket]);

  const rename = useCallback((id, name) => socket.emit(
    'renameChannel',
    {
      id,
      name,
    },
  ), [socket]);

  const setMessage = useCallback((message, channelId, username) => socket.emit(
    'newMessage',
    {
      body: message,
      channelId,
      username,
    },
  ), [socket]);

  const context = useMemo(() => ({
    add, remove, rename, setMessage,
  }), [add, remove, rename, setMessage]);

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  );
};
