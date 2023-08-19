import ChatHeader from "./ChatHeader";
import MatchesDispaly from "./MatchesDisplay";
import ChatDispaly from "./ChatDisplay";

const ChatContainer = ({ user }) => {
  return (
    <div className="chat_container">
      <ChatHeader user = {user}/>

      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      <MatchesDispaly matches = {user.matches} />
      <ChatDispaly />
    </div>
  );
};
export default ChatContainer;
