import { useAppSelector, useAppDispatch } from '../app/hooks';
import { allUsers, fetchUsers } from '../features/users/usersSlice';
import User from '../utils/user';

function Login() {
    const users = useAppSelector(allUsers);
    const dispatch = useAppDispatch();
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => dispatch(fetchUsers())}>Fetch Users</button>
            <ul>
                {Object.values(users).map((user: User) => (
                    <li key={user.id}>{user.name}</li>
                ))}
                </ul>
        </div>
    );
}

export default Login;