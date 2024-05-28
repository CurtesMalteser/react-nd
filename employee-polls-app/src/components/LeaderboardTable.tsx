import Table from 'react-bootstrap/Table';
import User from '../utils/user';

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

export default LeaderboardTable;