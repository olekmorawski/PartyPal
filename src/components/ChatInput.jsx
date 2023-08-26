import { useState } from "react";
import axios from "axios";

const ChatInput = ({
  user,
  clickedUser,
  getUsersMessages,
  getClickedUserMessages,
}) => {
  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };
    try {
      await axios.post("http://localhost:8000/message", { message });
      getUsersMessages();
      getClickedUserMessages();
      setTextArea("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat_input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="btn-secondary" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
