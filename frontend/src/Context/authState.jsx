import { useEffect, useState } from "react";
import TodoContext from "./Authcontext";
import axios from "axios";
import { useAlert } from "react-alert";

const AuthState = (props) => {
  const [user, setUser] = useState();
  const alert = useAlert();
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        alert.success(data.message);
        setUser(data.user);
        return true;
      }
    } catch (error) {
      alert.error(error.response.data.message);
      return false;
    }
  };
  const loadUser = async () => {
    const { data } = await axios.get("http://localhost:8000/api/v1/auth/me", {
      withCredentials: true,
    });
    if (data.success) {
      setUser(data.user);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        alert.success(data.message);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      alert.error(error.response.data.message);
    }
  };
  const signup = async (email, password, username) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        { username, email, password },
        { withCredentials: true }
      );
      if (data.success) {
        alert.success(data.message);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      alert.error(error.response.data.message);
    }
  };
  const data = {
    logout,
    user,
    loadUser,
    login,
    signup,
  };
  return (
    <TodoContext.Provider value={data}>{props.children}</TodoContext.Provider>
  );
};

export default AuthState;
