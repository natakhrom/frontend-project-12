const Message = ({ username, text }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    :
    {' '}
    {text}
  </div>
);

export default Message;
