import { fetchUsers, sortedUsersForLeadearboad, status as fetchUsersStatus } from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import LeaderboardTable from '../components/LeaderboardTable';
import { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import ComponentLoader from '../components/loader/ComponentLoader';
import useRequireAuth from '../hooks/useRequireAuth';

function LeaderboardPage() {

    useRequireAuth();

    const dispatch = useAppDispatch();
    const users = useAppSelector(sortedUsersForLeadearboad);
    const status = useAppSelector(fetchUsersStatus);

    useEffect(() => { dispatch(fetchUsers()) }, [dispatch]);

    if (status === 'loading') { return <ComponentLoader /> }

    return (
        <Container>
            <LeaderboardTable users={users} />
        </Container>
    );
}

export default LeaderboardPage;
