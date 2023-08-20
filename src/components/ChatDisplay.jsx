import { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatDispaly = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUserMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const getMessages = async (fromId, toId) => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: toId, correspondingUserId: fromId },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserMessages(getMessages(userId, clickedUserId));
    setClickedUsersMessages(getMessages(clickedUserId, userId));
  }, [usersMessages, clickedUsersMessages]);

  const messages = []

  return (
    <>
      <Chat />
      <ChatInput />
    </>
  );
};
export default ChatDispaly;
