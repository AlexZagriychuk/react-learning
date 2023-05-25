import { Link } from "react-router-dom";
import "./Navigation.css"
import { useAppSelector } from "../../redux/hooks";
import { selectAllUsersNormalized, selectCurrentUserId } from "../../redux/modules/usersSlice";

export default function Navigation() {
    const currentUserId = useAppSelector(selectCurrentUserId)
    const allUsersNormalized = useAppSelector(selectAllUsersNormalized)
    const currentUser = allUsersNormalized[currentUserId]

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

                <div className="nav-bar-user">
                    <img className="nav-bar-user-avatar" src={currentUser.avatar} alt="Avatar" />
                    <div className="nav-bar-user-data">
                        <span className="nav-bar-user-name">{currentUser.name}</span>
                        <span className="nav-bar-user-type">({currentUser.type})</span>
                    </div>
                </div>
            </nav>
        </>
    );
}