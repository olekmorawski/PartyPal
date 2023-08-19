import { useEffect, useState } from "react";
import axios from "axios";

const MatchesDispaly = ({ matches }) => {
  const [ matchedProfiles, setMatchedProfiles ] = useState(null)

  const matchedUserIds = matches.map(({user_id}) => user_id)

  const getMatches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: {userIds: JSON.stringify(matchedUserIds)}
      })
      setMatchedProfiles(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMatches()
  }, [])


  console.log(matchedProfiles)

  return ( 
  <div className="matches_display">
    {matchedProfiles?.map((match, _index) => (
      <div key={{_index}} className="match_card">
        <div className="img-container">
          <img src={match.url} alt={match?.first_name + ' profile'} />
        </div>
        <h3>{match?.first_name}</h3>
      </div>
    ))}

  </div>
  )
};
export default MatchesDispaly;
