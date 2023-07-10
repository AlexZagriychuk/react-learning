import { User, UserType, UserAlbum } from "../../../components/user/userTypes";
import { baseApiSlice } from "../common_api";
import { DateUnit, generateDates } from "../../../utils/dateUtils";
import { Post } from "../../../components/posts/postsTypes";
import { ToDoItem } from "../../../components/todo/todoTypes";
import { getFakeAdminUser } from "../../../components/user/userUtils";
import { transformPostsApiResponse } from "../posts";


// 1. Replace first user with our fake Admin user
// 2. Add fake avatar to all fetched users (API does not return it, but our APP requires it)
// 3. Add fake user registration date (API does not return it, but our APP requires it)
export const processGetUsersApiResponse = (usersApiResponseData: []): User[] => {
    const usersCount = usersApiResponseData.length

    let oneYearFromNowInThePast = new Date();
    oneYearFromNowInThePast.setFullYear(oneYearFromNowInThePast.getFullYear() - 1);
    const fakeRegistrationDates = generateDates(usersCount, oneYearFromNowInThePast, DateUnit.DAY, -30)

    const users = usersApiResponseData.map((userData: any, index) => {
        let fakeUserRegistrationDateStr = fakeRegistrationDates[usersCount - index - 1].toLocaleDateString()
        const userId = userData.id

        if (index === 0) {
            return getFakeAdminUser(userId, fakeUserRegistrationDateStr)
        } else {
            return {
                ...userData,
                type: UserType.WRITER,
                avatarSmall: `https://picsum.photos/id/${userId * 10}/300/200`,
                avatarBig: `https://picsum.photos/id/${userId * 10}/900/600`,
                registered: fakeUserRegistrationDateStr
            } as User
        }
    })

    return users
}


export const usersApi = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            transformResponse: (responseData: []) => {
                return processGetUsersApiResponse(responseData);
            }
        }),
        getPostsByUserId: builder.query({
            query: (userId: number) => `/users/${userId}/posts`,
            transformResponse: (responseData: Post[]) => {
                return transformPostsApiResponse(responseData)
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
