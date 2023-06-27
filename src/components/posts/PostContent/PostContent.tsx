import { Post } from "../postsTypes";
import styles from "./PostContent.module.css"

export default function PostContent({post}: { post: Post }) {
    return (
        <div className={styles["post-content"]}>
            <h3 className={styles["post-content-title"]}>{post.title}</h3>
            <div className={styles["post-content-body"]}>{post.body}</div>
        </div>
    )
}
