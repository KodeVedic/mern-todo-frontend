import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('https://mern-todo-backend-18fb.onrender.com/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTodo = () => {
    axios.post('https://mern-todo-backend-18fb.onrender.com/api/todos', { title })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.log(err));
    setTitle('');
  };

  const deleteTodo = id => {
    axios.delete(`https://mern-todo-backend-18fb.onrender.com/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Add a new todo" 
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;




