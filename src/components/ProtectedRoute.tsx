import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCurrentUser } from '../store/features/usersSlice';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useDispatchType';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { token, status } = useSelector((state: RootState) => state.users);


  useEffect(() => {
    if(token){
      dispatch(fetchCurrentUser())
    } 
  }, [])
  

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (!token || status === 'rejected') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
