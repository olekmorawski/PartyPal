import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [interestingUsers, setInterestingUsers] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [lastDirection, setLastDirection] = useState();

  const { eventId } = useParams();
  const userId = cookies.UserId;

  const fetchEventData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/geteventdata/${eventId}`
      );
      setEventData(response.data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const fetchInterestedUsers = async () => {
    if (eventData && eventData.attendees && eventData.attendees.length > 0) {
      try {
        const response = await axios.get(`http://localhost:8000/users`, {
          params: { userIds: JSON.stringify(eventData.attendees) },
        });
        setInterestingUsers(response.data);
      } catch (error) {
        console.error("Error fetching interested users:", error);
      }
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user`, {
        params: { userId },
      });
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    fetchInterestedUsers();
  }, [eventData]);

  useEffect(() => {
    getUser();
  }, [userId]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    ? user.matches.map(({ user_id }) => user_id).concat(userId)
    : [];

  const filterInterestingUsers = interestingUsers?.filter((interestingUser) =>
    matchedUserIds ? !matchedUserIds.includes(interestingUser.user_id) : true
  );

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        user && (
          <div className="dashboard">
            <ChatContainer user={user} />
            <div className="swipe_container">
              <div className="card_container">
                {filterInterestingUsers?.map((interestingUser) => (
                  <TinderCard
                    className="swipe"
                    key={interestingUser.user_id}
                    onSwipe={(dir) => swiped(dir, interestingUser.user_id)}
                    onCardLeftScreen={() =>
                      outOfFrame(interestingUser.first_name)
                    }
                  >
                    <div
                      style={{
                        backgroundImage: "url(" + interestingUser.url + ")",
                      }}
                      className="card"
                    >
                      <h3>{interestingUser.first_name}</h3>
                    </div>
                  </TinderCard>
                ))}
                <div className="swipe_info">
                  {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Dashboard;
