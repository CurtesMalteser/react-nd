import { fetchUsers, sortedUsersForLeadearboad } from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import LeaderboardTable from '../components/LeaderboardTable';
import { useEffect } from 'react';

function LeaderboardPage() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(sortedUsersForLeadearboad);

    useEffect(() => { dispatch(fetchUsers()) }, []);

    return (
        <LeaderboardTable users={users} />
    );
}

export default LeaderboardPage;
