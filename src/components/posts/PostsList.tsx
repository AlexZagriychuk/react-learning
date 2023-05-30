import { useAppSelector } from "../../redux/hooks"
import { selectPosts } from "../../redux/modules/postsSlice"
import { selectAllUsersNormalized } from "../../redux/modules/usersSlice"
import "./PostsList.css"
import PostsListItem from "./PostsListItem"
import { Post } from "./posts"

export default function PostsList() {
    const posts = useAppSelector(selectPosts)
    const usersNormalized = useAppSelector(selectAllUsersNormalized)

    const getPostsListItemsReversed = (posts: Post[]) => {
        const res  = [] 
        for(let index = posts.length - 1; index >= 0; index--) {
            let post = posts[index]
            res.push(<PostsListItem key={post.id} post={post} user={usersNormalized[post.userId]}/>)
        }
        return res 
    }

    return (
        <>
            <h2>Posts:</h2>

            <ul className="posts-list">
                {getPostsListItemsReversed(posts)}
            </ul>
        </>
    )
}