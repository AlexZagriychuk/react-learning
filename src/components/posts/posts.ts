export interface Post {
    id: number,
    userId: number,
    title: string,
    body: string,
    date: string
}

export interface Posts {
    nextPostId: number,
    postsData: Array<Post>
}

export const getNextPostId = (postsData: Array<Post>) : number => {
    return Math.max(...postsData.map(post => post.id)) + 1
}
