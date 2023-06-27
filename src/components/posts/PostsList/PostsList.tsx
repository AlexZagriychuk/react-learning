import { useMemo, useState } from "react"
import { useAppSelector } from "../../../redux/hooks"
import { selectApiErrorsByComponent } from "../../../redux/modules/common_api"
import { ApiErrorComponent } from "../../error/ApiError/types"
import { selectPosts } from "../../../redux/modules/posts"
import { useGetPostsQuery } from "../../../redux/modules/posts"
import { selectAllUserEntities, selectCurrentUserId } from "../../../redux/modules/users"
import ApiError from "../../error/ApiError"
import { getUnknownUser } from "../../user/userUtils"
import styles from "./PostsList.module.css"
import PostsListItem from "../PostsListItem"
import PostForm from "../PostForm"
import postsCommonStyles from "../PostsCommon.module.css"

export default function PostsList() {
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery()

    const posts = useAppSelector(selectPosts)
    const userEntities = useAppSelector(selectAllUserEntities)
    const postsApiErrors = useAppSelector(state => selectApiErrorsByComponent(state, ApiErrorComponent.POSTS))

    const [isAddingNewPost, setIsAddingNewPost] = useState(false)
    // If current user changed while we are adding new post we stop adding new post (setIsAddingNewPost(false))
    const currentUserId = useAppSelector(selectCurrentUserId)
    const [prevCurrentUserId, serPrevCurrentUserId] = useState(currentUserId)
    if(prevCurrentUserId !== currentUserId) {
        setIsAddingNewPost(false)
        serPrevCurrentUserId(currentUserId)
    }

    const onPostAddOrEditClosed = () => {
        setIsAddingNewPost(false)
    }

    const postsListItemsReversed = useMemo(() => {
        const unknownUser = getUnknownUser()
        return posts.map(post => {
            return (
                <PostsListItem key={post.id} post={post} user={userEntities[post.userId] || unknownUser}/>
            )
        }).reverse()
    }, [posts, userEntities])

    let content
    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <ul className={styles["posts-list"]}>
            {isAddingNewPost 
                ? <PostForm postToEditAndUser={null} onPostAddOrEditClosed={onPostAddOrEditClosed} />
                : <button className={postsCommonStyles["posts-page-btn"]} onClick={() => setIsAddingNewPost(true)}>Add New Post</button>
            }
            {postsListItemsReversed}
        </ul>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <>
            <h2>Posts:</h2>
            {postsApiErrors.map(toDoApiError => <ApiError key={toDoApiError.errorId} {...toDoApiError} />)}
            {content}
        </>
    )
}