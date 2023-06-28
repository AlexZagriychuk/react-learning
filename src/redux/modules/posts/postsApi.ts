import { Post } from "../../../components/posts/postsTypes";
import { generateDates } from "../../../utils/dateUtils";
import { apiErrorCaught, baseApiSlice } from "../common_api";
import { ApiErrorComponent } from "../../../components/error/ApiError";
import { postAdded } from "./postsSlice";


export const postsApi = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts',
            transformResponse: (responseData: Post[]) => {
                const postsLength = responseData.length;

                // Generate fake post dates (API does not have this field, but our App has)
                const generatedDates = generateDates(postsLength);
                responseData.forEach((post, index) => { post.date = generatedDates[postsLength - index - 1].toLocaleString(); });

                return responseData;
            }
        }),
        addPost: builder.mutation<Post, Partial<Post>>({
            query(data) {
                return {
                    url: '/posts',
                    method: 'POST',
                    body: data,
                };
            },
            async onQueryStarted(newPost: Post, { dispatch, queryFulfilled }) {
                // Pessimistic update
                try {
                    const { data: _createdPost } = await queryFulfilled;
                    // We do not use the response from this API because it will not actually create a post on the backend
                    // If post request is successful it will always return the same new post ID
                    // So if we add multiple posts we need to save into the store our newPost (with generated next post ID)
                    dispatch(postAdded(newPost));
                    dispatch(postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
                        draft.push(newPost);
                    }));
                } catch (e: any) {
                    const error = e.error;
                    const errorText = `Could not add new post (title: '${newPost.title}', body: '${newPost.body}') via API. ${error.error} (${error.originalStatus} - ${error.status})`;
                    dispatch(apiErrorCaught({ errorText, errorComponent: ApiErrorComponent.POSTS }));
                }
            },
        }),
    })
});

export const { useGetPostsQuery, useAddPostMutation } = postsApi;
