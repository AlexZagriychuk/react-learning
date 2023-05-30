import { Link } from "react-router-dom";
import "./Navigation.css"
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { currentUserChanged, selectAllUsers, selectCurrentUserId, selectCurrentUser } from "../../redux/modules/usersSlice";
import { useState } from "react";
import { User, getUnknownUser } from "../user/users";

export default function Navigation() {
    const dispatch = useAppDispatch()
    const [userSelectionOpened, setUserSelectionOpened] = useState(false)

    const allUsers = useAppSelector(selectAllUsers)
    const currentUserId = useAppSelector(selectCurrentUserId)    
    const currentUser = useAppSelector(selectCurrentUser) || getUnknownUser()

    const handleUserSelectedClick = (selectedUserId: number) => {
        if(currentUserId !== selectedUserId) {
            dispatch(currentUserChanged(selectedUserId))
        }
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
                    <img className="nav-bar-user-avatar" src={currentUser.avatar} alt="Avatar" />
                    <div className="nav-bar-user-data">
                        <span className="nav-bar-user-name">{currentUser.name}</span>
                        <span className="nav-bar-user-type">({currentUser.type})</span>
                    </div>

                    <div className={"nav-bar-user-select" + (userSelectionOpened ? " active" : "")}>
                        {allUsers.map((user: User) => {
                            return (
                                <div key={user.id} onClick={() => handleUserSelectedClick(user.id)}>{user.name}</div>
                            )
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
}