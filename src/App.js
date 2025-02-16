// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import "./index.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState({});

 
  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist")) || [];
    const savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos")) || [];
    setTodos(savedTodo);
    setCompletedTodos(savedCompletedTodo);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(allTodos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [allTodos, completedTodos]);

  const handleAddTodo = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newTodoItem = { title: newTitle, description: newDescription };
    setTodos([...allTodos, newTodoItem]);
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    setTodos(allTodos.filter((_, i) => i !== index));
  };

  const handleComplete = (index) => {
    const now = new Date();
    const completedItem = { ...allTodos[index], completedOn: now.toLocaleString() };
    setCompletedTodos([...completedTodos, completedItem]);
    setTodos(allTodos.filter((_, i) => i !== index));
  };

  const handleDeleteCompletedTodo = (index) => {
    setCompletedTodos(completedTodos.filter((_, i) => i !== index));
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem({ ...item });
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem({ ...(currentEditedItem || {}), title: value });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem({ ...(currentEditedItem || {}), description: value });
  };

  const handleSaveEdit = (index) => {
    const updatedTodos = [...allTodos];
    updatedTodos[index] = currentEditedItem;
    setTodos(updatedTodos);
    setCurrentEdit(null);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {!isCompleteScreen &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                {currentEdit === index ? (
                  <div className="edit-wrapper">
                    <input
                      placeholder="Updated title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem?.title || ""}
                    />
                    <textarea
                      placeholder="Updated description"
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      rows={4}
                      value={currentEditedItem?.description || ""}
                    ></textarea>
                    <button className="primary-Btn"onClick={() => handleSaveEdit(index)}>Save</button>
                    <button  className="secondary-Btn"onClick={() => setCurrentEdit(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete?" />
                      <BsCheckLg className="check-icon" onClick={() => handleComplete(index)} title="Complete?" />
                      <AiOutlineEdit className="icon" onClick={() => handleEdit(index, item)} title="Edit?" />
                    </div>
                  </>
                )}
              </div>
            ))}

          {isCompleteScreen &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <small>Completed On: {item.completedOn}</small>
                  </p>
                </div>
                <div>
                  <AiOutlineDelete className="icon" onClick={() => handleDeleteCompletedTodo(index)} title="Delete?" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;