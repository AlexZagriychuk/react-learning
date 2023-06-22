import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User, UserAlbum, UserType } from "../../components/user/userTypes";
import { getFakeAdminUser } from "../../components/user/userUtils";
import { apiSlice } from "./apiSlice";
import { DateUnit, generateDates } from "../../utils/dateUtils";
import { Post } from "../../components/posts/postsTypes";
import { ToDoItem } from "../../components/todo/todoTypes";


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            transformResponse: (responseData: []) => {
                return processGetUsersApiResponse(responseData)
            }
        }),
        getPostsByUserId: builder.query({
            query: (userId: number) => `/users/${userId}/posts`,
            transformResponse: (responseData: Post[]) => {
                const postsLength = responseData.length

                // Generate fake post dates (API does not have this field, but our App has)
                const generatedDates = generateDates(postsLength)
                responseData.forEach((post, index) => {post.date = generatedDates[postsLength - index - 1].toLocaleString()})
        
                return responseData
            }
        }),
        getTodosByUserId: builder.query({
            query: (userId: number) => `/users/${userId}/todos`,
            transformResponse: (responseData: []) => {
                return responseData as ToDoItem[]
            }
        }),
        getAlbumsByUserId: builder.query({
            query: (userId: number) => `/users/${userId}/albums`,
            transformResponse: (responseData: []) => {
                return responseData as UserAlbum[]
            }
        }),
    })
})

export const { useGetUsersQuery, useGetPostsByUserIdQuery, useGetTodosByUserIdQuery, useGetAlbumsByUserIdQuery } = extendedApiSlice

// 1. Replace first user with our fake Admin user
// 2. Add fake avatar to all fetched users (API does not return it, but our APP requires it)
// 3. Add fake user registration date (API does not return it, but our APP requires it)
const processGetUsersApiResponse = (usersApiResponseData: []): User[] => {
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


const usersAdapter = createEntityAdapter<User>({
    sortComparer: (a, b) => a.id - b.id
})

const initialState = usersAdapter.getInitialState({
    activeUserId: 0,
    nextUserId: 1
})

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        currentUserChanged: (state, action: PayloadAction<number>) => {
            state.activeUserId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(extendedApiSlice.endpoints.getUsers.matchFulfilled, (_state, action) => {
            return usersAdapter.setAll(initialState, action.payload)
        })
    }
})

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors((state: RootState) => state.users)

export const selectAllUserEntities = (state: RootState) => state.users.entities
export const selectCurrentUserId = (state: RootState) => state.users.activeUserId
export const selectCurrentUser = (state: RootState) => selectUserById(state, selectCurrentUserId(state))

export const { currentUserChanged } = usersSlice.actions
export default usersSlice.reducer