import React, {useContext, useState} from "react";
import TodoContext from "../Context/TodoContext";

const AddTodo = () => {
    const [inputValue, setInputValue] = useState({title:"", description:""});
    const handleChange = (e)=>{
        setInputValue({...inputValue, [e.target.name]:e.target.value});
    }
    const {addTodo, getTodos} = useContext(TodoContext)
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await addTodo(inputValue.title, inputValue.description);
        getTodos()
        
    }
  return (
    <section className="my-5">
      <h1 className="font-semibold text-3xl">Add a todo</h1>
      <form
        className="my-5 flex flex-col content-center justify-center "
        onSubmit={handleSubmit}
      >
        <div className="">
          <label htmlFor="title" className="text-lg font-medium">
            Todo title:{" "}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={inputValue.title}
            className="w-80 bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="my-4 flex justify-center items-center">
          <label htmlFor="title" className="text-lg font-medium">
            Todo description: &nbsp;
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={inputValue.description}
            className="w-80 bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="w-30 text-sm m-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-md"
        >
          Add Todo
        </button>
      </form>
    </section>
  );
};

export default AddTodo;
