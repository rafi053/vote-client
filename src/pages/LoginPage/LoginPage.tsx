import { FC, useState } from 'react';
import useForm from '../../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useDispatchType';
import { login } from '../../store/features/usersSlice';

interface FormState {
  [key: string]: string;
}

const Login: FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const initialValues: FormState = {
    username: '',
    password: '',
  }

  const onSubmit = (values: FormState) => {
    dispatch(login({ username: values.username, password: values.password })).then(
      (action) => {
        if (login.fulfilled.match(action)) {
          navigate("/candidates");
        }
      }
    );
  };

  const { values, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
  });
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          Username:
          <input
            id="username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </label>
        <label htmlFor='password'>
          Password:
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </label>
        <button type="submit">Login</button>
        
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;