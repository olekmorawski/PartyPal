const Chat = ({ descOrderMsg }) => {
  return (
    <div className="chat_display">
      {descOrderMsg.map((message, _index) => (
        <div key={_index}>
          <div className="chat_msg_header">
            <div className="img_container">
              <img src={message.img} alt={message.first_name + " profile"} />
            </div>
            <p>{message.name}</p>
          </div>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
