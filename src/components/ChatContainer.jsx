import ChatHeader from "./ChatHeader";
import MatchesDispaly from "./MatchesDisplay";
import ChatDispaly from "./ChatDisplay";

const ChatContainer = () => {
  return (
    <div className="chat_container">
      <ChatHeader />

      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      <MatchesDispaly />
      <ChatDispaly />
    </div>
  );
};
export default ChatContainer;
