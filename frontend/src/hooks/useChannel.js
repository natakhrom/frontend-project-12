import { useContext } from 'react';
import ChannelContext from '../context/channelContext';

const useChannel = () => useContext(ChannelContext);

export default useChannel;
