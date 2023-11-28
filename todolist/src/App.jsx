import { useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

import { CiEdit } from "react-icons/ci";
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      status: "Not Completed",
    };
    setTodos([...todos, newTodo]);
    setNewTitle("");
    setNewDescription("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditId(id);
      setEditTitle(todoToEdit.title);
      setEditDescription(todoToEdit.description);
    }
  };

  const saveEdit = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === editId) {
        return { ...todo, title: editTitle, description: editDescription };
      }
      return todo;
    });
    setTodos(updatedTodos);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "All") {
      return true;
    } else if (filter === "Completed") {
      return todo.status === "Completed";
    } else if (filter === "Not Completed") {
      return todo.status === "Not Completed";
    }
    return true;
  });

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="todo-input">
        
        <input
          type="text"
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          placeholder="Enter task name"
        />
        <input
          type="text"
          value={newDescription}
          onChange={event => setNewDescription(event.target.value)}
          placeholder="Enter description"
        />
        <button onClick={addTodo} className='btn'>Add Todo</button>
      </div>
      <div className="filter-container">
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      <div className="todos-container">
        {filteredTodos.map(todo => (
          <div className="todo-card" key={todo.id}>
            {editId === todo.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editTitle}
                  onChange={event => setEditTitle(event.target.value)}
                  placeholder="Enter task name"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={event => setEditDescription(event.target.value)}
                  placeholder="Enter description"
                />
                <button onClick={saveEdit}className='secondarybtn'>Save</button>
                <button onClick={cancelEdit}className='secondarybtn'>Cancel</button>
              </div>
            ) : (
              <>
              <div className='text-cont'>
                <h3>Title:{todo.title}</h3>
                <p>Description:{todo.description}</p>
                <div className="status-container">
                  <span
                    className={`status ${todo.status === "Completed" ? "completed" : ""}`}
                    onClick={() => updateStatus(todo.id, todo.status === "Completed" ? "Not Completed" : "Completed")}
                  >
                   Status: {todo.status}
                  </span>
                  <button onClick={() => editTodo(todo.id)} className='secondarybtnedit'>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}className='secondarybtn'>Delete</button>
                </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
