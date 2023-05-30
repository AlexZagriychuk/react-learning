import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../components/posts/posts";
import { RootState } from "../store";


export const postsSlice = createSlice({
    name: "posts",
    initialState: getAllPosts(),
    reducers: {
        postAdded: function() {
            // Not implemented
        }
    }
})

export const selectNextPostId = (state: RootState) => state.posts.nextPostId
export const selectPosts = (state: RootState) => state.posts.postsData

export const { postAdded } = postsSlice.actions
export default postsSlice.reducer