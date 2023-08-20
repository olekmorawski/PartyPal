import { useState } from "react";

const ChatInput = () => {
  const [textArea, setTextArea] = useState("");

  return (
    <div className="chat_input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="btn-secondary">Submit</button>
    </div>
  );
};

export default ChatInput;
