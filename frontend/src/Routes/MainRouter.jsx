import React, { useState } from "react";
import UserTable from "../pages/People";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import SignUpPage from "../pages/SignUpPage";
import { AuthProvider } from "react-auth-kit";
import AdminContext from "../contexts/AdminContext";
import UserContext from "../contexts/UserContext";
import SidebarAdmin from "../Components/SideBarAdmin/SidebarAdmin";
import LoginForm from "../pages/LoginForm";
import Success from "../Components/Flouci/Success";
import FailedPayment from "../Components/Flouci/FailedPayment";
import ResetPage from "../pages/ResetPage";
import ResetPassword from "../pages/ResetPassword";
import ScoreLibrary from "../pages/ScoreLibrary";
import CollectionFolder from "../Components/InstrumentList/CollectionFolder";
import ChatPage from "../pages/ChatPage";
import Navigation from "../pages/Navigation";
import HomePage from "../pages/HomePage";
import About from "../pages/About";

function MainRouter() {
  const [admin, setadmin] = useState(null);
  const [user, setuser] = useState(null);

  return (
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <AdminContext.Provider value={{ admin, setadmin }}>
        <UserContext.Provider value={{ user, setuser }}>
          <Router>
            {/* {<WrapperComponent><SidebarAdmin/></WrapperComponent>} */}
            <div>
              {user && <Sidebar />}
              {admin && <SidebarAdmin />}

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<SignUpPage />} />
                <Route path="/success" element={<Success />} />
                <Route path="/fail" element={<FailedPayment />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/reset" element={<ResetPage />} />
                <Route
                  path="/reset-password/:id/:token"
                  element={<ResetPassword />}
                />
                <Route path="/my-library" element={<ScoreLibrary />} />
                <Route path="/collection/:id" element={<CollectionFolder />} />
                <Route path="/chat" element={<ChatPage/>}/>
                <Route path="/navbar" element={<Navigation/>}/>
              </Routes>
            </div>
          </Router>
        </UserContext.Provider>
      </AdminContext.Provider>
    </AuthProvider>
  );
}

export default MainRouter;
