import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Onboarding from "./pages/Onboarding/Onboarding";
import "./index.css";

interface CookiesType {
  AuthToken?: string;
}

const App: React.FC = () => {
  const [cookies] = useCookies<string>(["user"]);

  const authToken: string | undefined = cookies.AuthToken;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {authToken && <Route path='/dashboard' element={<Dashboard />} />}
          {authToken && <Route path='/onboarding' element={<Onboarding />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
