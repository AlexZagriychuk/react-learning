import { useMemo, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { ApiErrorComponent, selectApiErrorsByComponent } from "../../redux/modules/apiSlice"
import { selectPosts, useGetPostsQuery } from "../../redux/modules/postsSlice"
import { selectAllUserEntities, selectCurrentUserId } from "../../redux/modules/usersSlice"
import ApiError from "../error/ApiError"
import { getUnknownUser } from "../user/users"
import "./PostsList.css"
import PostsListItem from "./PostsListItem"
import PostForm from "./PostForm"

export default function PostsList() {
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery(undefined)

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
        return posts.map(post => <PostsListItem key={post.id} post={post} user={userEntities[post.userId] || unknownUser}/>).reverse()
    }, [posts, userEntities])

    let content
    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <ul className="posts-list">
            {isAddingNewPost 
                ? <PostForm postToEditAndUser={null} onPostAddOrEditClosed={onPostAddOrEditClosed} />
                : <button className="posts-page-btn" onClick={() => setIsAddingNewPost(true)}>Add New Post</button>
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