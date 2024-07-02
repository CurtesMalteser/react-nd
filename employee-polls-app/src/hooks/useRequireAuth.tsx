import { useEffect } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { isAuthed } from '../features/authedUser/authedUserSlice';
import ROUTES from '../constants/routes';

function RequireAuth({ children }: { children: React.ReactNode }) {

  const isLoggedIn = useAppSelector(isAuthed);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN, { state: { from: location } });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ path: location }} />
  }

  return <>{children}</>;

}

export default RequireAuth;