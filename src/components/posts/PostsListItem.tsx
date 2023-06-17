import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUserId } from "../../redux/modules/usersSlice";
import { dateDiffAsString } from "../../utils/DateUtils";
import { User } from "../user/users";
import { Post } from "./posts";

export default function PostsListItem(props: {post: Post, user: User}) {
    const currentUserId = useAppSelector(selectCurrentUserId)

    return (
        <li className={currentUserId === props.post.userId ? "posted-by-current-user" : ""}>
            <div className="post-user-data">
                <img src={props.user.avatarSmall} alt="" className="post-user-img" />
                <span className="post-user-name">{props.user.username}</span>
                <span className="post-user-type">({props.user.type})</span>
                <span className="post-user-registered">Registered:<br/>{props.user.registered}</span>
            </div>

            <div className="post-content">
                <h3 className="post-content-title">{props.post.title}</h3>
                <div className="post-content-body">{props.post.body}</div>
            </div>

            <div className="post-date-and-controls">
                <span><i>Posted:</i><br/>{props.post.date}<br/></span>
                <span className="post-date-diff">({dateDiffAsString(new Date(props.post.date))} ago)</span>
            </div>
        </li>
    )
}
