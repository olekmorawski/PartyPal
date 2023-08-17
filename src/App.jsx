import store from "./store";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
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
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};
export default App;
