import { Post } from "./postsTypes";


export const getNextPostId = (postsData: Array<Post>): number => {
    return Math.max(...postsData.map(post => post.id)) + 1;
};
