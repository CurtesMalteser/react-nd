import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { isAuthed } from '../features/authedUser/authedUserSlice';
import ROUTES from '../constants/routes';


function useRequireAuth() {
  
  const isLoggedIn = useAppSelector(isAuthed);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
     navigate(ROUTES.LOGIN)
    }
  }, [isLoggedIn]);
}

export default useRequireAuth;