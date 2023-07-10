import { User, UserAlbum } from "../../../components/user/userTypes";
import { baseApiSlice } from "../common_api";
import { Post } from "../../../components/posts/postsTypes";
import { ToDoItem } from "../../../components/todo/todoTypes";
import { transformPostsApiResponse } from "../posts";
import { convertDateStrToLocaleDateStr } from "../../../utils/DateUtilsTMP";


function transformUser(user: User) {
    user.registered = convertDateStrToLocaleDateStr(user.registered)
    return user
}

export function transformUsersApiResponse(users: User[]) {
    // Replace registered for all users with locale date string 
    users.forEach(transformUser)
    return users
}

export const usersApi = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            transformResponse: (responseData: User[]) => {
                return transformUsersApiResponse(responseData);
            }
        }),
        getPostsByUserId: builder.query({
            query: (userId: number) => `/users/${userId}/posts`,
            transformResponse: (responseData: Post[]) => {
                return transformPostsApiResponse(responseData);
            }
        }),
        getTodosByUserId: builder.query({
            query: (userId: number) => `/users/${userId}/todos`,
            transformResponse: (responseData: []) => {
                return responseData as ToDoItem[];
            }
        }),
        getAlbumsByUserId: builder.query({
            query: (userId: number) => `/users/${userId}/albums`,
            transformResponse: (responseData: []) => {
                return responseData as UserAlbum[];
            }
        }),
    })
});

export const { useGetUsersQuery, useGetPostsByUserIdQuery, useGetTodosByUserIdQuery, useGetAlbumsByUserIdQuery } = usersApi;
