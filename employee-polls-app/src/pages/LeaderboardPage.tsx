import { fetchUsers, sortedUsersForLeadearboad } from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import LeaderboardTable from '../components/LeaderboardTable';
import { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';

function LeaderboardPage() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(sortedUsersForLeadearboad);

    useEffect(() => { dispatch(fetchUsers()) }, []);

    return (
        <Container>
            <LeaderboardTable users={users} />
        </Container>
    );
}

export default LeaderboardPage;
