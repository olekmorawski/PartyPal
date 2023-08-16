import { useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";

const Dashboard = () => {
  const characters = [
    {
      name: "Olek Morawski",
      url: "styles/images/fot1.jpg",
    },
    {
      name: "John Doe",
      url: "styles/images/fot1.jpg",
    },
    {
      name: "Jane Smith",
      url: "styles/images/fot1.jpg",
    },
    {
      name: "Alex Johnson",
      url: "styles/images/fot1.jpg",
    },
    {
      name: "Emily Brown",
      url: "styles/images/fot1.jpg",
    },
  ];
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swipe_container">
        <div className="card_container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
          <div className="swipe_info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
