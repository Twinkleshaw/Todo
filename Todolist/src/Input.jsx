import { useState } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
function Input({ onAddTodo }) {
  const [task, setTask] = useState();
  const [error, setError] = useState();

  const handleButton = async () => {
    if (task.trim().length === 0) {
      setError("You have not entered any task");
      return;
    } else {
      setError("");
    }
    try {
      const response = await axios.post("http://localhost:3000/add", {
        task,
      });
      // Assuming the server response includes the new todo item
      const newTodo = { ...response.data, done: false }; // Ensure `done` is false
      onAddTodo(newTodo); // Update the parent component's state
      setTask(""); // Clear the input field after adding
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center space-x-4 p-4 rounded-md justify-center">
        <input
          type="text"
          value={task}
          placeholder="Add Your Todo's Here"
          className=" p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600  "
          onClick={handleButton}
        >
          Add
        </button>
      </div>
      <div>
        {/* Render error message */}
        {error && (
          <div className="bg-red-100 text-red-600 border border-red-300 rounded-md p-2 w-full mb-2">
            {error}
          </div>
        )}
      </div>
    </>
  );
}

export default Input;
