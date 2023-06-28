import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUserId } from "../../../redux/modules/users";
import { User } from "../../user/userTypes";
import PostDate from "../PostDate";
import PostUserData from "../PostUserData";
import { Post } from "../postsTypes";
import postsCommonStyles from "../PostsCommon.module.css"
import PostContent from "../PostContent";

export default function PostsListItem(props: { post: Post, user: User }) {
    const currentUserId = useAppSelector(selectCurrentUserId)

    return (
        <li className={postsCommonStyles["posts-list-item"]
            + (currentUserId === props.post.userId ? " " + postsCommonStyles["posted-by-current-user"] : "")
        }>
            <div className={postsCommonStyles["post-list-item-left-column"]}>
                <PostUserData user={props.user} />
            </div>

            <div className={postsCommonStyles["post-list-item-middle-column"]}>
                <PostContent post={props.post} />
            </div>

            <div className={postsCommonStyles["post-list-item-right-column"]}>
                <PostDate post={props.post} />
            </div>
        </li>
    )
}
