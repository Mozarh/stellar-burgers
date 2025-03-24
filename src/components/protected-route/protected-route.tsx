import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectIsInit
} from '../../slices/stellarBurgerSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthenticated);
  const isInit = useSelector(selectIsInit);
  const location = useLocation();

  if (!isInit) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
