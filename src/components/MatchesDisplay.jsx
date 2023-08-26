import { useEffect, useState } from "react";
import axios from "axios";

const MatchesDispaly = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);

  const matchedUserIds = matches.map(({ user_id }) => user_id);

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

  // const filteredMatches = matchedProfiles?.filter(matchedProfile => matchedProfile.matches.filter(profile => profile.user_id == userId)).length > 0

  return (
    <div className="matches_display">
      {/* change this if you want this func to work */}
      {matchedProfiles?.map((match) => (
        <div
          key={match.user_id}
          className="match_card"
          onClick={() => setClickedUser(match)}
        >
          <div className="img_container">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};
export default MatchesDispaly;
