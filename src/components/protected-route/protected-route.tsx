import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks';
import { selectIsAuthChecked, selectUser } from '@selectors/user';
import { Preloader } from '@components/ui';

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
