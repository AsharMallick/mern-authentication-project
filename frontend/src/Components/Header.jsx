import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Authcontext from "../Context/Authcontext";

const Header = () => {
  const location = useLocation();
  const url = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const { user, logout } = useContext(Authcontext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <React.Fragment>
      <header>
        <nav>
          <ul className="m-0 flex gap-3 h-16 font-semibold px-3 items-center shadow-md justify-center text-md hover:shadow-purple-200 transition-all">
            <Link to={"/"}>
              <li
                className={`hover:text-[16.5px] p-3 ${
                  url == "" ? "text-purple-600" : ""
                } transition-all hover:text-purple-600 cursor-pointer`}
              >
                Home
              </li>
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to={"/login"}>
                  <li
                    className={`hover:text-[16.5px] p-3 ${
                      url == "login" && "text-purple-600"
                    } transition-all hover:text-purple-600 cursor-pointer`}
                  >
                    Login
                  </li>
                </Link>
                <Link to={"/signup"}>
                  <li
                    className={`hover:text-[16.5px] p-3 ${
                      url == "signup" && "text-purple-600"
                    } transition-all hover:text-purple-600 cursor-pointer`}
                  >
                    Signup
                  </li>{" "}
                </Link>
              </>
            ) : (
              <>
                <Link to={"/myprofile"}>
                  <li
                    className={`hover:text-[16.5px] p-3 ${
                      url == "myprofile" && "text-purple-600"
                    } transition-all hover:text-purple-600 cursor-pointer`}
                  >
                    {user.username}
                  </li>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md text-white transition-all bg-purple-500 hover:bg-purple-600 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
