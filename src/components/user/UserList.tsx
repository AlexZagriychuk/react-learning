import "./UsersList.css"
import { useGetUsersQuery } from "../../redux/modules/usersSlice"
import UserListItem from "./UserListItem"
import { User } from "./users"

export default function UserList() {
    const { data: allUsers, isLoading, isSuccess, isError, error } = useGetUsersQuery("")

    let content
    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <ul className="users-list">
            {allUsers.ids.map(id => {
                let user = allUsers.entities[id] as User
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