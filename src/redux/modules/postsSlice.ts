import { createSlice } from "@reduxjs/toolkit";
import { Post, getNextPostId } from "../../components/posts/posts";
import { RootState } from "../store";
import { generateDates } from "../../utils/DateUtils";
import { apiSlice } from "./apiSlice";


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: (responseData: Post[]) => {
                const postsLength = responseData.length

                // Generate fake post dates (API does not have this field, but our App has)
                const generatedDates = generateDates(postsLength)
                responseData.forEach((post, index) => {post.date = generatedDates[postsLength - index - 1].toLocaleString()})
        
                return responseData
            }
        })
    })
})

export const { useGetPostsQuery } = extendedApiSlice


const initialState = {
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
        builder.addMatcher(extendedApiSlice.endpoints.getPosts.matchFulfilled, (state, action) => {
            const postsData = action.payload
            state.postsData = postsData
            state.nextPostId = getNextPostId(postsData)
        })
    }
})

export const selectNextPostId = (state: RootState) => state.posts.nextPostId
export const selectPosts = (state: RootState) => state.posts.postsData

export const { postAdded } = postsSlice.actions
export default postsSlice.reducer