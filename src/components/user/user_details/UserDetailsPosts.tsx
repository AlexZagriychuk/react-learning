import { useMemo } from "react"
import { useGetPostsByUserIdQuery } from "../../../redux/modules/usersSlice"
import PostsListItem from "../../posts/PostsListItem"
import { User } from "../users"

export default function UserDetailsPosts({user}: {user: User}) {
    const {data: posts, isLoading, isError, error} = useGetPostsByUserIdQuery(user.id) 

    const postsListItemsReversed = useMemo(() => {
        const res  = []
        if(posts) {
            for(let index = posts.length - 1; index >= 0; index--) {
                let post = posts[index]    
                res.push(<PostsListItem key={post.id} post={post} user={user}/>)
            }
        }
        return res
    }, [posts, user])

    let content
    if (isError) {
        content = <div>{error.toString()}</div>
    } else if (isLoading) {
        content = <div>Loading...</div>
    } else {
        content = <ul className="posts-list">{postsListItemsReversed}</ul>
    }

    return (
        <>
            {content}
        </>
    )
}