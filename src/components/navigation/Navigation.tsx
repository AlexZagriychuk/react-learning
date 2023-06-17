import { Link } from "react-router-dom";
import "./Navigation.css"
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { currentUserChanged, selectCurrentUserId, selectCurrentUser, useGetUsersQuery, selectAllUsers } from "../../redux/modules/usersSlice";
import { useEffect, useState } from "react";
import { User, getUnknownUser } from "../user/users";

export default function Navigation() {
    const dispatch = useAppDispatch()
    const [userSelectionOpened, setUserSelectionOpened] = useState(false)

    const { isLoading: isLoadingUsers, isSuccess: isSuccessUsers, isError: isErrorUsers, error: errorUsers } = useGetUsersQuery("")

    const allUsers = useAppSelector(selectAllUsers)
    const currentUserId = useAppSelector(selectCurrentUserId)
    const currentUser = useAppSelector(selectCurrentUser) || getUnknownUser()

    const handleUserSelectedClick = (selectedUserId: number) => {
        if(currentUserId !== selectedUserId) {
            dispatch(currentUserChanged(selectedUserId))
        }
    }

    useEffect(() => {
        if(currentUserId === 0) {
            // Get min user id or -1
            const userIds : number[] = allUsers.map(user => user.id) || [-1]
            let minUserId = Math.min(...userIds)
        
            if(minUserId !== -1) {
                dispatch(currentUserChanged(minUserId))
            }
        }
    }, [allUsers])


    let usersListContent
    if (isLoadingUsers) {
        usersListContent = <div>Loading...</div>
    } else if (isSuccessUsers) {
        usersListContent = allUsers.map((user: User) => {
            return <div key={user.id} onClick={() => handleUserSelectedClick(user.id)}>{user.username}</div>
        })
    } else if (isErrorUsers) {
        usersListContent = <div>{errorUsers.toString()}</div>
    }

    return (
        <>
            <nav className="horizontal-nav-bar">
                <ul>
                    <li>
                        <Link to={`posts`}>Posts</Link>
                    </li>
                    <li>
                        <Link to={`todo`}>Todo</Link>
                    </li>
                    <li>
                        <Link to={`users`}>Users</Link>
                    </li>
                </ul>

                <div className="nav-bar-user" onClick={() => setUserSelectionOpened(!userSelectionOpened)}>
                    <img className="nav-bar-user-avatar" src={currentUser.avatarSmall} alt="Avatar" />
                    <div className="nav-bar-user-data">
                        <span className="nav-bar-user-name">{currentUser.username}</span>
                        <span className="nav-bar-user-type">({currentUser.type})</span>
                    </div>

                    <div className={"nav-bar-user-select" + (userSelectionOpened ? " active" : "")}>
                        {usersListContent}
                    </div>
                </div>
            </nav>
        </>
    );
}