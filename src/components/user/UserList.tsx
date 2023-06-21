import "./UsersList.css"
import { selectAllUsers, useGetUsersQuery } from "../../redux/modules/usersSlice"
import UserListItem from "./UserListItem"
import { useAppSelector } from "../../redux/hooks"

export default function UserList() {
    const { isLoading, isError, error } = useGetUsersQuery(undefined)
    const allUsers = useAppSelector(selectAllUsers)

    let content
    if (isError) {
        content = <div>{error.toString()}</div>
    } else if (isLoading) {
        content = <div>Loading...</div>
    } else {
        content = <ul className="users-list">
            {allUsers.map(user => {
                return <UserListItem key={user.id} {...user} />
            })}
        </ul>
    }

    return (
        <>
            <h2>Users List:</h2>
            {content}
        </>
    )
}