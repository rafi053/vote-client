import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useDispatchType';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../store/features/todos/todosSlice';
import { logout } from '../../store/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import "./TodosPage.css"

const TodosPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { todos, status, error } = useSelector((state:RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTodo({ title, description })).then(() => {
      setTitle('');
      setDescription('');
    });
  };

  const handleToggleComplete = (todo: any) => {
    dispatch(
      updateTodo({
        _id: todo._id,
        completed: !todo.completed,
      })
    );
  };

  const handleDeleteTodo = (_id: string) => {
    dispatch(deleteTodo(_id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h2>Todos</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {status === 'loading' && <p className="loading-message">Loading...</p>}
      {error && <p>{error}</p>}
      <form className="add-todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id}>
            <h3
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </h3>
            <p>{todo.description}</p>
            <button
              className="complete-btn"
              onClick={() => handleToggleComplete(todo)}
            >
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
