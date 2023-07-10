import { dateDiffAsString } from "../../../utils/DateUtilsTMP";
import { Post } from "../postsTypes";
import styles from "./PostDate.module.css"

export default function PostDate({post}: {post: Post}) {
    return (
        <div className={styles["post-date"]}>
            <span><i>Posted:</i><br/>{post.createdAt}<br/></span>
            <span className={styles["post-date-diff"]}>({dateDiffAsString(new Date(post.createdAt))} ago)</span>
        </div>
    )
}
