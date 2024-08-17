import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import CoursePage from "../CoursePage/CoursePage";
import Home from "../Home/Home";

import CourseEditPage from "../CourseEditPage/CourseEditPage";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
 

      { user ? <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/manage-courses" element={<CoursePage user={user}  />} />
        <Route path="/course/:id" element={<CourseEditPage />} />
        

        </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );

}

export default App;


