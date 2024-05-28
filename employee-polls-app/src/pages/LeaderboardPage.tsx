import Table from 'react-bootstrap/Table';
import { fetchUsers, sortedUsersForLeadearboad } from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import User from '../utils/user';
import { useEffect } from 'react';

function LeaderboardTable({ users }: { users: User[] }) {
    return (
        <Table bordered hover>
            <thead>
                <tr>
                    <th colSpan={2}>Users</th>
                    <th>Answered</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.avatarURL}</td>
                        <td>{user.name}<p>{user.id}</p></td>
                        <td>{Object.keys(user.answers).length}</td>
                        <td>{user.questions.length}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

function LeaderboardPage() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(sortedUsersForLeadearboad);

    useEffect(() => { dispatch(fetchUsers()) }, []);

    return (
        <LeaderboardTable users={users} />
    );
}

export default LeaderboardPage;
