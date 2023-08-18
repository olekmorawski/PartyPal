import store from "./store";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Events from "./pages/Events";
import EventCreation from "./pages/Eventcreation";
import { StoreProvider } from "easy-peasy";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/events" element={<Events />} />
          <Route path="/eventcreation" element={<EventCreation />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};
export default App;
