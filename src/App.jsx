import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Events from "./pages/Events";
import EventCreation from "./pages/Eventcreation";
import EventInfo from "./pages/EventInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<Onboarding />} />}
        {authToken && <Route path="/events" element={<Events />} />}
        {authToken && (
          <Route path="/eventcreation" element={<EventCreation />} />
        )}
        {authToken && <Route path="/eventinfo" element={<EventInfo />} />}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
