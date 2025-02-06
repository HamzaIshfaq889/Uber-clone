import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProtectWrapperC, CaptainProtectWrapperC } from "./components";

import {
  CaptainLogin,
  CaptainSignup,
  UserLogin,
  UserSignup,
  Landing,
  Home,
  UserLogout,
  CaptainLogout,
} from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <ProtectWrapperC>
              <Home />
            </ProtectWrapperC>
          }
        />
        <Route
          path="/user/logout"
          element={
            <ProtectWrapperC>
              <UserLogout />
            </ProtectWrapperC>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapperC>
              <CaptainLogout />
            </CaptainProtectWrapperC>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
