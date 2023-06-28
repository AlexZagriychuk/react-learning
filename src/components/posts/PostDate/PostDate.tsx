import { dateDiffAsString } from "../../../utils/dateUtils";
import { Post } from "../postsTypes";
import styles from "./PostDate.module.css"

export default function PostDate({post}: {post: Post}) {
    return (
        <div className={styles["post-date"]}>
            <span><i>Posted:</i><br/>{post.date}<br/></span>
            <span className={styles["post-date-diff"]}>({dateDiffAsString(new Date(post.date))} ago)</span>
        </div>
    )
}
