import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./index.css";
import AuthState from "./Context/authState.jsx";
import TodoState from "./Context/todoState.jsx";

const options = {
  position: positions.TOP_CENTER,
  timeout: 1200,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <AuthState>
          <TodoState>
            <App />
          </TodoState>
        </AuthState>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);
