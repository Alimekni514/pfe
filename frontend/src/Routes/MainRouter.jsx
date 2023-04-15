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
import ViewPageTeacher from "../Components/Assignments/ViewPageTeacher";

function MainRouter() {
  const [admin, setadmin] = useState(null);
  const [user, setuser] = useState(null);
  const [assignment, setassignment] = useState(null);
  const [classroom,setclassroom]=useState(null);

  return (
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <AdminContext.Provider value={{ admin, setadmin }}>
        <UserContext.Provider value={{ user, setuser }}>
          <Assignment.Provider value={{ assignment, setassignment }}>
            <ClassContext.Provider value={{classroom,setclassroom}}>
            <Router>
              {/* {<WrapperComponent><SidebarAdmin/></WrapperComponent>} */}

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
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/navbar" element={<Navigation />} />
                <Route path="/class" element={<ClassPage/>}/>
                <Route path="/class/:classid" element={<ClassroomAdmin/>}/>
                <Route path="/class/:classid/assignment" element={<CreateAssignment/>}/>
                <Route path="/class/:classid/assignment/:assignmentId" element={<SkeletonNewScore/>}/>
                <Route path="/class/:classid/assignment/:assignmentId/edit" element={<EditCreateAssignment/>}/>
                <Route path="/view" element={<ViewPageTeacher/>}/>
                <Route path="/people" element={<People />} />
              </Routes>
            </Router>
            </ClassContext.Provider>
          </Assignment.Provider>
        </UserContext.Provider>
      </AdminContext.Provider>
    </AuthProvider>
  );
}

export default MainRouter;
