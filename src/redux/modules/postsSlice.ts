import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, getNextPostId } from "../../components/posts/posts";
import { RootState } from "../store";
import { generateDates } from "../../utils/DateUtils";
import { ApiErrorComponent, apiErrorCaught, apiSlice } from "./apiSlice";


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
        }),
        addPost: builder.mutation<Post, Partial<Post>>({
            query(data) {
                return {
                    url: `/posts`,
                    method: 'POST',
                    body: data,
                }
            },
            async onQueryStarted(newPost: Post, { dispatch, queryFulfilled }) {
                // Optimistic state update
                const postId = newPost.id
                dispatch(postAdded(newPost))
                                
                const queryDataChangeAction = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
                        draft.push(newPost)
                    })
                )

                try {
                    await queryFulfilled
                } catch(e : any) {
                    // Undo state updates on API error
                    const error = e.error
                    const errorText = `Could not add new post (title: '${newPost.title}', body: '${newPost.body}') via API. ${error.error} (${error.originalStatus} - ${error.status})`
                    dispatch(apiErrorCaught({errorText, errorComponent: ApiErrorComponent.POSTS}))

                    queryDataChangeAction.undo()
                    dispatch(postRemoved(postId))
                }
            },
        }),
    })
})

export const { useGetPostsQuery, useAddPostMutation } = extendedApiSlice


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
        builder.addMatcher(extendedApiSlice.endpoints.getPosts.matchFulfilled, (state, action) => {
            const postsData = action.payload
            state.postsData = postsData
            state.nextPostId = getNextPostId(postsData)
        })
    }
})

export const selectNextPostId = (state: RootState) => state.posts.nextPostId
export const selectPosts = (state: RootState) => state.posts.postsData

export const { postAdded, postRemoved } = postsSlice.actions
export default postsSlice.reducer