import React, { useContext, useEffect } from "react";
import authContext from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import AddTodo from "../Components/AddTodo";
import Todos from "../Components/Todos";
import TodoContext from "../Context/TodoContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const { getTodos, todos, deleteTodo:todoDelete, editTodo:todoEdit } = useContext(TodoContext);
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user]);
  useEffect(() => {
    getTodos();
  }, []);

  const editTodo = async(id) => {
    await todoEdit(id);
    getTodos();

  }
  const deleteTodo = async(id)=>{
    await todoDelete(id);
    getTodos();
  }
  return (
    <>
      <main className="w-full text-center my-3 text-2xl ">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold">Todooss - </h1>
          <small className="font-normal mb-3 text-center mt-4">
            &nbsp;Your notes on the cloud
          </small>
        </div>
        <hr className="mt-4" />
        <AddTodo />
        <Todos todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
      </main>
    </>
  );
};

export default Home;
