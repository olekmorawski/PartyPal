import ChatHeader from "./ChatHeader";
import MatchesDispaly from "./MatchesDisplay";
import ChatDispaly from "./ChatDisplay";
import { useState } from "react";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null)
  return (
    <div className="chat_container">
      <ChatHeader user = {user}/>

      <div>
        <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
        <button className="option" disabled={!clickedUser}>Chat</button>
      </div>
      {!clickedUser && <MatchesDispaly matches = {user.matches} setClickedUser={setClickedUser} />}
      {clickedUser && <ChatDispaly user={user} clickedUser={clickedUser}/>}
    </div>
  );
};
export default ChatContainer;
