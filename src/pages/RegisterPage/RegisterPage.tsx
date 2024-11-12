import { FC } from 'react';
import useForm from '../../hooks/useForm';
import { useAppDispatch } from '../../hooks/useDispatchType';
import { register } from '../../store/features/usersSlice';
import { useNavigate } from 'react-router-dom';

interface FormState {
  [key: string]: string;
}

const Register: FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  const initialValues: FormState = {
    username: '',
    password: '',
  }

  const onSubmit = (values: FormState) => {
    dispatch(register({ username: values.username, password: values.password })).then(
      (action) => {
        if (register.fulfilled.match(action)) {
          navigate("/login");
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
      <h1>Register</h1>
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
        <button type="submit">Register</button>
        
      </form>
      
    </div>
  );
};

export default Register;