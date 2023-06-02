import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getPosts, selectLoading, selectPosts } from "../../redux/modules/postsSlice"
import { selectAllUserEntities } from "../../redux/modules/usersSlice"
import { getUnknownUser } from "../user/users"
import "./PostsList.css"
import PostsListItem from "./PostsListItem"
import { Post } from "./posts"

export default function PostsList() {
    const dispatch = useAppDispatch()
    
    const posts = useAppSelector(selectPosts)
    const loading = useAppSelector(selectLoading)
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


    useEffect(() => {
        dispatch(getPosts())
    }, [])

    return (
        <>
            <h2>Posts:</h2>
            {loading
                ? <p>Loading...</p>
                : (<ul className="posts-list">
                    {getPostsListItemsReversed(posts)}
                </ul>)
            }
        </>
    )
}