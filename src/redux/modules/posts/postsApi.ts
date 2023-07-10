import { Post } from "../../../components/posts/postsTypes";
import { apiErrorCaught, baseApiSlice } from "../common_api";
import { ApiErrorComponent } from "../../../components/error/ApiError";
import { postAdded } from "./postsSlice";
import { convertDateStrToLocaleDateStr } from "../../../utils/dateUtils";
import { usersApi } from "../users";
import { MaybeDrafted } from "@reduxjs/toolkit/dist/query/core/buildThunks";


function transformPost(post: Post) {
    post.createdAt = convertDateStrToLocaleDateStr(post.createdAt)
    return post
}

export function transformPostsApiResponse(posts: Post[]) {
    // Replace createdAt for all posts with locale date string 
    posts.forEach(transformPost)
    return posts
}

export const postsApi = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts',
            transformResponse: (responseData: Post[]) => {
                return transformPostsApiResponse(responseData)
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
                    const { data } = await queryFulfilled;
                    const createdPost = transformPost({...data})
                    dispatch(postAdded(createdPost));

                    const updatePostsQueryData = (draft: MaybeDrafted<Post[]>) => {
                        draft.push(createdPost);
                    }
                    dispatch(postsApi.util.updateQueryData('getPosts', undefined, updatePostsQueryData));
                    // Also update usersApi query data for getPostsByUserId
                    dispatch(usersApi.util.updateQueryData('getPostsByUserId', createdPost.userId, updatePostsQueryData))
                } catch (e: any) {
                    const error = e.error;
                    const errorText = `Could not add new post (title: '${newPost.title}', body: '${newPost.body}') via API. ${error.data} (${error.originalStatus} - ${error.status})`;
                    dispatch(apiErrorCaught({ errorText, errorComponent: ApiErrorComponent.POSTS }));
                }
            },
        }),
    })
});

export const { useGetPostsQuery, useAddPostMutation } = postsApi;
