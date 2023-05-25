import "./UsersList.css"
import { useAppSelector } from "../../redux/hooks"
import { selectAllUsersNormalized } from "../../redux/modules/usersSlice"
import UserListItem from "./UserListItem"

export default function UserList() {
    const allUsersNormalized = useAppSelector(selectAllUsersNormalized)

    return (
        <>
            <h2>Users List:</h2>
            <ul className="users-list">
                {Object.values(allUsersNormalized).map(user => {
                    return <UserListItem key={user.id} {...user} />
                })}
            </ul>
        </>
    )
}