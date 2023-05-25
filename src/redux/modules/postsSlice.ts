import { createSlice } from "@reduxjs/toolkit";
import { Post, getAllPosts } from "../../components/posts/posts";
import { RootState } from "../store";

export interface PostsNormalized {
    [key: number]: Post
}

export interface PostsState {
    nextPostId: number,
    postsNormalized: PostsNormalized
}

const generateInitialState = () : PostsState => {
    const allPosts = getAllPosts()

    const postsNormalized = allPosts.postsData.reduce((acc, post) => {
        acc[post.id] = post
        return acc
    }, {} as PostsNormalized)

    return {
        nextPostId: allPosts.nextPostId,
        postsNormalized
    }
}

export const postsSlice = createSlice({
    name: "posts",
    initialState: generateInitialState(),
    reducers: {
        postAdded: function() {
            // Not implemented
        }
    }
})

export const selectNextPostId = (state: RootState) => state.posts.nextPostId
export const selectPostsNormalized = (state: RootState) => state.posts.postsNormalized

export const { postAdded } = postsSlice.actions
export default postsSlice.reducer