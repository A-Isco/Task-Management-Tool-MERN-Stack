import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RegisterPage from "./pages/register/RegisterPage";
import VerificationPage from "./pages/verify account/VerificationPage";
import EditProfilePage from "./pages/edit profile/EditProfile";
import LoginPage from "./pages/login/LoginPage";
import CreateTask from "./pages/create task/CreateTask";
import Tasks from "./pages/Tasks/Tasks";
import EditTask from "./pages/edit task/EditTask";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem("user");
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", auth);
  }, [auth]);

  console.log(auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!auth && (
            <>
              <Route
                path="/login"
                element={<LoginPage authenticate={() => setAuth(true)} />}
              />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/verify" element={<VerificationPage />} />
            </>
          )}

          {auth && (
            <>
              <Route path="/editProfile" element={<EditProfilePage />} />
              <Route path="/task/create" element={<CreateTask />} />
              <Route
                path="/task/show"
                element={<Tasks logout={() => setAuth(false)} />}
              />
              <Route path="/task/:taskId" element={<EditTask />} />
            </>
          )}

          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
