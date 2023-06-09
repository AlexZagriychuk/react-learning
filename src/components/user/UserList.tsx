import "./UsersList.css"
import { selectAllUsers, useGetUsersQuery } from "../../redux/modules/usersSlice"
import UserListItem from "./UserListItem"
import { useAppSelector } from "../../redux/hooks"

export default function UserList() {
    const { isLoading, isSuccess, isError, error } = useGetUsersQuery("")
    const allUsers = useAppSelector(selectAllUsers)

    let content
    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <ul className="users-list">
            {allUsers.map(user => {
                return <UserListItem key={user.id} {...user} />
            })}
        </ul>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <>
            <h2>Users List:</h2>
            {content}
        </>
    )
}