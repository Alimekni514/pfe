import React, { useState } from "react";
import UserTable from "../pages/People";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import SignUpPage from "../pages/SignUpPage";
import { AuthProvider } from "react-auth-kit";
import AdminContext from "../contexts/AdminContext";
import UserContext from "../contexts/UserContext";
import Assignment from "../contexts/Assignment";
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
import CreateAssignment from "../Components/Assignments/CreateAssignment";
import People from "../pages/People";
import SkeletonNewScore from "../Components/Assignments/SkeletonNewScore";
import EditCreateAssignment from "../Components/Assignments/EditCreateAssignment";
import ClassPage from "../pages/ClassPage";
import ClassroomAdmin from "../Components/class/ClassroomAdmin";
import ClassContext from "../contexts/ClassContext";
import BadgeContext from "../contexts/BadgeContext";
import ViewPageTeacher from "../Components/Assignments/ViewPageTeacher";
import AddPeople from "../Components/class/AddPeople";
import BadgeAvatar from "../Components/Badge/BadgeAvatar";
import ManageAuthentification from "../Components/CustomHooks/ManageAuthentification";
import AssignmentTypes from "../Components/class/AssignmentTypes";

function MainRouter() {
  const [admin, setadmin] = useState(
    JSON.parse(localStorage.getItem("_auth_state"))?.role === "admin" && true
  );
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("_auth_state"))?.role === "user" && true
  );
  const [assignment, setassignment] = useState(null);
  const [classroom, setclassroom] = useState(null);
  const [badge, setbadge] = useState(
    JSON.parse(localStorage.getItem("_auth_state"))?.role && true
  );
  return (
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <AdminContext.Provider value={{ admin, setadmin }}>
        <UserContext.Provider value={{ user, setuser }}>
          <Assignment.Provider value={{ assignment, setassignment }}>
            <ClassContext.Provider value={{ classroom, setclassroom }}>
              <BadgeContext.Provider value={{ badge, setbadge }}>
                <Router>
                  {/* {<WrapperComponent><SidebarAdmin/></WrapperComponent>} */}
                  {user && <Sidebar />}
                  {admin && <SidebarAdmin />}
                  {badge && <BadgeAvatar />}
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
                    <Route
                      path="/collection/:id"
                      element={<CollectionFolder />}
                    />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/navbar" element={<Navigation />} />
                    <Route path="/class" element={<ClassPage />} />
                    <Route
                      path="/class/:classid"
                      element={<ClassroomAdmin />}
                    />
                    <Route
                      path="/class/:classid/assignment"
                      element={<CreateAssignment />}
                    />
                    <Route
                      path="/class/:classid/assignment/:assignmentId"
                      element={<SkeletonNewScore />}
                    />
                    <Route
                      path="/class/:classid/assignment/:assignmentId/edit"
                      element={<EditCreateAssignment />}
                    />
                    <Route path="/class/:classid/assignment/types" element={<AssignmentTypes/>}/>
                    <Route path="/class/:classid/add" element={<AddPeople />} />
                    <Route path="/view" element={<ViewPageTeacher />} />
                    <Route path="/people" element={<People />} />
                  </Routes>
                </Router>
              </BadgeContext.Provider>
            </ClassContext.Provider>
          </Assignment.Provider>
        </UserContext.Provider>
      </AdminContext.Provider>
    </AuthProvider>
  );
}

export default MainRouter;
