import './LeaderboardTable.css';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import User from '../utils/user';
import getAvatarImage from '../utils/avatar';

function LeaderboardTable({ users }: { users: User[] }) {
    return (
        <Table bordered hover className='border border-success leaderboard-header'>
            <thead>
                <tr>
                    <th >Users</th>
                    <th>Answered</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td style={{ display: 'flex', alignItems: 'center', border: '0', borderColor: 'transparent' }}>
                            <Image style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                src={getAvatarImage(user.avatarURL)}
                                alt={'Profile Picture'}
                                roundedCircle />
                            <div>
                                <strong>{user.name}</strong>
                                <p>{user.id}</p>
                            </div>
                        </td>
                        <td>{Object.keys(user.answers).length}</td>
                        <td>{user.questions.length}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default LeaderboardTable;