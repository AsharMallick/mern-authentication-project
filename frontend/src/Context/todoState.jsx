import React, { useState } from "react";
import TodoContext from "./TodoContext";
import axios from "axios";
import { useAlert } from "react-alert";

const TodoState = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const alert = useAlert();
  const addTodo = async (title, description) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/todo/new",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        alert.success(data.message);
      }
    } catch (err) {
      alert.error(err.response.data.message);
      console.log(err);
    }
  };
  const getTodos = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/todo/all",
        { withCredentials: true }
      );
      if (data.success) {
        setTodos(data.todos);
      }
    } catch (error) {
      console.log(error);
      // alert.error(error.response.data.message);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8000/api/v1/todo/delete/" + id,
        { withCredentials: true }
      );
      if (data.success) {
        alert.success(data.message);
      }
    } catch (error) {
      alert.error(error.response.data.message);
      console.log(error);
    }
  };
  const editTodo = async (id) => {
    try {
      const { data } = await axios.put(
        "http://localhost:8000/api/v1/todo/update/" + id,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        alert.success(data.message);
      }
    } catch (error) {
      alert.error(error.response.data.message);
      console.log(error);
    }
  };
  const data = {
    addTodo,
    getTodos,
    todos,
    deleteTodo,
    editTodo
  };
  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};

export default TodoState;
