import postsCommonStyles from "../PostsCommon.module.css"
import styles from "./PostControls.module.css"


export default function PostControls({isEditingPost, onPostAddOrEditClosed} : {isEditingPost: boolean, onPostAddOrEditClosed: Function}) {    
    return (
        <div className={styles["post-controls"]}>
            <input type="submit" className={postsCommonStyles["posts-page-btn"]} value={isEditingPost ? "Edit" : "Create"} />
            <input type="reset" className={postsCommonStyles["posts-page-btn"]} value="Cancel" onClick={() => onPostAddOrEditClosed()} />
        </div>
    )
}