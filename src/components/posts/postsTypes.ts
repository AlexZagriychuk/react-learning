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
