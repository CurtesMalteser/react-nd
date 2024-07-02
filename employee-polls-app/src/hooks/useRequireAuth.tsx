import { useEffect } from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { isAuthed } from '../features/authedUser/authedUserSlice';
import ROUTES from '../constants/routes';


function useRequireAuth() {

  const isLoggedIn = useAppSelector(isAuthed);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN, { state: { from: location } });
    }
  }, [isLoggedIn, navigate, location]);
}

export default useRequireAuth;