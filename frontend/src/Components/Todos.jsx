import React from "react";

const Todos = ({ todos, deleteTodo, editTodo }) => {
  let sno = 0;

  return (
    <section className="w-3/4 mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                {todos.length > 0 && (
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Sno
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Delete
                      </th>
                    </tr>
                  </thead>
                )}
                {todos.length > 0 ? (
                  todos.map((todo) => (
                    <tbody key={todo._id}>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {++sno}
                        </td>
                        <td className={`whitespace-nowrap px-6 py-4 ${todo.isCompleted?"line-through":""}`}>
                          {todo.title}
                        </td>
                        <td className={`whitespace-nowrap px-6 py-4 ${todo.isCompleted?"line-through":""}`}>
                          {todo.description}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex flex-row items-center">
                          <input
                            type="checkbox"
                            id="check"
                            value="cb1"
                            checked={todo.isCompleted}
                            onChange={() => editTodo(todo._id)}
                            className="
            appearance-none h-6 w-6 bg-gray-400 rounded-full 
            checked:bg-green-300 checked:scale-75
            transition-all duration-200 peer"
                          />
                          <div
                            className="h-6 w-6 absolute rounded-full pointer-events-none
        peer-checked:border-green-300 peer-checked:border-2
        "
                          ></div>
                          <label
                            className="rounded-md p-2 ml-2 bg-purple-500 text-white"
                            onClick={()=>editTodo(todo._id)}
                          >
                            Completed
                          </label>
                        </td>
                        <td>
                          <button
                            className="ml-4 "
                            onClick={() => deleteTodo(todo._id)}
                          >
                            Delete todo
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                    <>
                    <hr />
                    <h1 className="text-xl font-bold">
                      You don't have any todos
                    </h1>
                    </>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todos;
