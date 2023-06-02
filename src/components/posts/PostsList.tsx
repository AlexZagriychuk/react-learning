import { useAppSelector } from "../../redux/hooks"
import { selectPosts } from "../../redux/modules/postsSlice"
import { selectUserById } from "../../redux/modules/usersSlice"
import { getUnknownUser } from "../user/users"
import "./PostsList.css"
import PostsListItem from "./PostsListItem"
import { Post } from "./posts"

export default function PostsList() {
    const posts = useAppSelector(selectPosts)

    const getPostsListItemsReversed = (posts: Post[]) => {
        const res  = [] 
        for(let index = posts.length - 1; index >= 0; index--) {
            let post = posts[index]
            let user = useAppSelector(state => selectUserById(state, post.userId)) || getUnknownUser()

            res.push(<PostsListItem key={post.id} post={post} user={user}/>)
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