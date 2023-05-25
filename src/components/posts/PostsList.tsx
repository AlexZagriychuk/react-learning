import { useAppSelector } from "../../redux/hooks"
import { selectPostsNormalized } from "../../redux/modules/postsSlice"
import { selectAllUsersNormalized } from "../../redux/modules/usersSlice"
import "./PostsList.css"
import PostsListItem from "./PostsListItem"

export default function PostsList() {
    const postsNormalized = useAppSelector(selectPostsNormalized)
    const usersNormalized = useAppSelector(selectAllUsersNormalized)

    return (
        <>
            <h2>Posts:</h2>

            <ul className="posts-list">
                {Object.values(postsNormalized).reverse().map(post => {
                    return <PostsListItem key={post.id} post={post} user={usersNormalized[post.userId]}/>
                })}
            </ul>
        </>
    )
}