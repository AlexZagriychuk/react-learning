import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUserId } from "../../redux/modules/usersSlice";
import { dateDiffAsString } from "../../utils/DateUtils";
import { User } from "../user/users";
import { Post } from "./posts";
import styles from "./PostsList.module.css"

export default function PostsListItem(props: {post: Post, user: User}) {
    const currentUserId = useAppSelector(selectCurrentUserId)

    return (
        <li className={currentUserId === props.post.userId ? styles["posted-by-current-user"] : ""}>
            <div className={styles["post-user-data"]}>
                <img src={props.user.avatarSmall} alt="" className={styles["post-user-img"]} />
                <span className={styles["post-user-name"]}>{props.user.username}</span>
                <span className={styles["post-user-type"]}>({props.user.type})</span>
                <span className={styles["post-user-registered"]}>Registered:<br/>{props.user.registered}</span>
            </div>

            <div className={styles["post-content"]}>
                <h3 className={styles["post-content-title"]}>{props.post.title}</h3>
                <div className={styles["post-content-body"]}>{props.post.body}</div>
            </div>

            <div className={styles["post-date-and-controls"]}>
                <span><i>Posted:</i><br/>{props.post.date}<br/></span>
                <span className={styles["post-date-diff"]}>({dateDiffAsString(new Date(props.post.date))} ago)</span>
            </div>
        </li>
    )
}
