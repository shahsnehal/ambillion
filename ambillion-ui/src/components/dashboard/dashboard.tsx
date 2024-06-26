import { UserList } from 'components/users/usersList';
export const Dashboard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <UserList />
            </div>
        </div>
    );
};
