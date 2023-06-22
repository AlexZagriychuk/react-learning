import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../components/posts/postsTypes";
import { getNextPostId } from "../../../components/posts/postsUtils";
import { postsApi } from "./postsApi";


const initialState = {
    nextPostId: 1,
    postsData: [] as Array<Post>
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: function(state, action: PayloadAction<Post>) {
            state.postsData.push(action.payload)
            state.nextPostId++
        },
        postRemoved: function(state, action: PayloadAction<number>) {
            state.postsData = state.postsData.filter(post => post.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(postsApi.endpoints.getPosts.matchFulfilled, (state, action) => {
            const postsData = action.payload
            state.postsData = postsData
            state.nextPostId = getNextPostId(postsData)
        })
    }
})

export const { postAdded, postRemoved } = postsSlice.actions
export const postsSliceReducer = postsSlice.reducer