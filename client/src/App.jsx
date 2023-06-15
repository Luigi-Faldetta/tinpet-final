/* eslint-disable no-unused-vars */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

//This is a test comment!!
//This is my second test comment!!

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const authToken = cookies.AuthToken;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {authToken && <Route path="/dashboard" element={<Dashboard />} />}
          {authToken && <Route path="/onboarding" element={<Onboarding />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
