import { User } from "./users";
import { Link } from "react-router-dom";
import styles from "./UsersList.module.css"

export default function UserListItem({id, avatarSmall: avatar, name, username, type, registered}: User ) {
    return (
        <li>
            <Link className={styles["user"]} to={`./${id}`}>
                <img className={styles["user-avatar"]} src={avatar} alt="" />
                <div className={styles["user-info"]}>
                    <span><b>UserName: </b>{username}</span>
                    <span><b>Name: </b>{name}</span>
                    <span><b>Type: </b>{type}</span>
                    <span><b>Registered: </b>{registered}</span>
                </div>
            </Link>
        </li>
    )
}