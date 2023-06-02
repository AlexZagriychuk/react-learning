import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../components/posts/posts";
import { RootState } from "../store";
import { generateDates } from "../../utils/DateUtils";

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const posts = await response.json() as Array<Post> 
        const postsLength = posts.length

        // Generate fake post dates (API does not have this field, but our App has)
        const generatedDates = generateDates(postsLength)
        posts.forEach((post, index) => {post.date = generatedDates[postsLength - index - 1].toLocaleString()})

        return posts
    }
)

const initialState = {
    loading: false,
    nextPostId: 1,
    postsData: [] as Array<Post>
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: function() {
            // Not implemented
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false
            state.postsData = action.payload
        }),
        builder.addCase(getPosts.rejected, (state) => {
            state.loading = false
        })
    }
})

export const selectNextPostId = (state: RootState) => state.posts.nextPostId
export const selectPosts = (state: RootState) => state.posts.postsData
export const selectLoading = (state: RootState) => state.posts.loading


export const { postAdded } = postsSlice.actions
export default postsSlice.reducer