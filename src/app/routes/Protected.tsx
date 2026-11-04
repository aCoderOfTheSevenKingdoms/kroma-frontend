import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import type { RootState } from '../app.store';

const Protected = ({children}: {children: ReactNode}): ReactNode => {

  const {user, initialized} = useSelector((state: RootState) => state.auth);

  if (!initialized) {
    return null;
  }

  if(!user) {
    return <Navigate to="/login" replace></Navigate>
  }

  return children;
}

export default Protected
