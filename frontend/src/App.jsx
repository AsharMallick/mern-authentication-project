import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import { useEffect, useContext } from "react";
import todoContext from "./Context/Authcontext";
import Signup from "./Pages/Signup";
function App() {
  const { user, loadUser } = useContext(todoContext);
  const naviagte = useNavigate();
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
