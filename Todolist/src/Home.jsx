import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { BiCheckbox } from "react-icons/bi";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then(() => setTodos((prev) => prev.filter((todo) => todo._id !== id)))
      .catch((err) => console.log(err));
  };
  const handleEdit = async (id) => {
    try {
      await axios.put("http://localhost:3000/update/" + id);
      setTodos((prevTodos) =>
        prevTodos.map(
          (todo) => (todo._id === id ? { ...todo, done: true } : todo) // Mark the todo as done
        )
      );
    } catch (err) {
      console.log("Error updating todo:", err);
    }
  };

  // Function to handle adding a new todo
  const handleAddTodo = async (newTodo) => {
    // Update the todos state with the new todo
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  return (
    <div className="  flex flex-col items-center pt-5">
      <h2 className="text-3xl  text-blue-600 mb-6 font-bold font-serif ">
        TODO LIST
      </h2>

      <div className="w-full max-w-lg mb-5">
        <Input onAddTodo={handleAddTodo} />
      </div>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4">
        {todos.length === 0 ? (
          <h2 className="text-center text-gray-500 text-lg font-medium">
            This Todo is empty
          </h2>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center bg-gray-100 border-b last:border-none p-3 rounded-lg mb-2"
              >
                <div
                  className="flex items-center"
                  onClick={() => handleEdit(todo._id)}
                >
                  {todo.done ? (
                    <BiSolidCheckboxChecked size={25} className="mr-2" />
                  ) : (
                    <BiCheckbox size={25} className="mr-2" />
                  )}

                  <span className="text-blue-600 font-bold font-roboto">
                    <p className={todo.done ? "line-through" : ""}>
                      {todo.task}
                    </p>
                  </span>
                </div>
                <button className="text-red-500 hover:text-red-700">
                  <MdDelete size={25} onClick={() => handleDelete(todo._id)} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
