import { useMemo } from "react"
import { useGetPostsByUserIdQuery } from "../../../redux/modules/usersSlice"
import PostsListItem from "../../posts/PostsListItem"
import { User } from "../userTypes"
import { postsListStyles } from "../../posts/PostsList"

export default function UserDetailsPosts({user}: {user: User}) {
    const {data: posts, isLoading, isError, error} = useGetPostsByUserIdQuery(user.id) 

    const postsListItemsReversed = useMemo(() => {
        return posts ? posts.map(post => <PostsListItem key={post.id} post={post} user={user}/>).reverse() : []
    }, [posts, user])

    let content
    if (isError) {
        content = <div>{error.toString()}</div>
    } else if (isLoading) {
        content = <div>Loading...</div>
    } else {
        content = <ul className={postsListStyles["posts-list"]}>{postsListItemsReversed}</ul>
    }

    return (
        <>
            {content}
        </>
    )
}