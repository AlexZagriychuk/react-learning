import { useAppSelector } from "../../redux/hooks"
import { selectPosts, useGetPostsQuery } from "../../redux/modules/postsSlice"
import { selectAllUserEntities } from "../../redux/modules/usersSlice"
import { getUnknownUser } from "../user/users"
import "./PostsList.css"
import PostsListItem from "./PostsListItem"
import { Post } from "./posts"

export default function PostsList() {
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery("")
    
    const posts = useAppSelector(selectPosts)
    const userEntities = useAppSelector(selectAllUserEntities)

    const getPostsListItemsReversed = (posts: Post[]) => {
        const res  = [] 
        for(let index = posts.length - 1; index >= 0; index--) {
            let post = posts[index]
            let user = userEntities[post.userId] || getUnknownUser()

            res.push(<PostsListItem key={post.id} post={post} user={user}/>)
        }
        return res 
    }

    let content
    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <ul className="posts-list">
            {getPostsListItemsReversed(posts)}
        </ul>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <>
            <h2>Posts:</h2>
            {content}
        </>
    )
}