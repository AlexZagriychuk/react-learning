import "./UsersList.css"
import { useAppSelector } from "../../redux/hooks"
import { selectAllUsers } from "../../redux/modules/usersSlice"
import UserListItem from "./UserListItem"

export default function UserList() {
    const allUsers = useAppSelector(selectAllUsers)

    return (
        <>
            <h2>Users List:</h2>
            <ul className="users-list">
                {allUsers.map(user => {
                    return <UserListItem key={user.id} {...user} />
                })}
            </ul>
        </>
    )
}