import { useCookies } from "react-cookie";

const ChatHeader = ({ user }) => {

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    window.location.reload();
  };

  return (
    <div className="chat_container_header">
      <div className="profile">
        <div className="img_container">
          <img src={user.url} alt={"photo of " + user.url} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className="log_out_icon" onClick={logout}>←</i>
    </div>
  );
};
export default ChatHeader;
