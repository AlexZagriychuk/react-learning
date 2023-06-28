import { User } from "../../user/userTypes";
import styles from "./PostUserData.module.css"

export default function PostUserData(props: {user: User}) {
    return (
        <div className={styles["post-user-data"]}>
            <img src={props.user.avatarSmall} alt="" className={styles["post-user-img"]} />
            <span className={styles["post-user-name"]}>{props.user.username}</span>
            <span className={styles["post-user-type"]}>({props.user.type})</span>
            <span className={styles["post-user-registered"]}>Registered:<br/>{props.user.registered}</span>
        </div>
    )
}
