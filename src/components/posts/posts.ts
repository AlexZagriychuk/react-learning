export interface Post {
    id: number,
    userId: number,
    title: string,
    post: string,
    date: string
}

export interface Posts {
    nextPostId: number,
    postsData: Array<Post>
}

const getNextPostId = (postsData: Array<Post>) : number => {
    return Math.max(...postsData.map(post => post.id)) + 1
}

export function getAllPosts() : Posts {
    const postsData : Array<Post> = [
        {
            id: 1,
            userId: 1,
            title: "Title 1",
            post: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore odio porro est, velit fugit temporibus animi dolorum debitis adipisci molestias. Non fuga nihil voluptate amet. Eaque molestiae, suscipit blanditiis aspernatur tempora atque modi neque ullam mollitia obcaecati. Et consequatur atque culpa voluptatibus blanditiis pariatur modi repellat ad quo debitis quae, distinctio neque commodi quaerat! Inventore doloremque sapiente nihil repellat porro, accusamus recusandae, nostrum impedit natus consequuntur eum debitis saepe, labore facere exercitationem quasi eos? A?",
            date: "5/23/2021, 9:04:55 AM"
        },
        {
            id: 2,
            userId: 2,
            title: "Title 2",
            post: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
            date: "5/24/2023, 11:24:11 AM"
        },
        {
            id: 3,
            userId: 2,
            title: "Title 3",
            post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, obcaecati!",
            date: "5/25/2023, 1:16:23 PM"
        },
        {
            id: 4,
            userId: 1,
            title: "Title 4",
            post: "Lorem ipsum dolor, parkour Michael!",
            date: "5/25/2023, 1:57:55 PM"
        },
    ]

    const nextPostId = getNextPostId(postsData) 

    return {
        nextPostId,
        postsData
    }
} 