import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User, UserType } from "../../components/user/users";
import { apiSlice } from "./apiSlice";
import { DateUnit, generateDates } from "../../utils/DateUtils";


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: (responseData: []) => {
                return processGetUsersApiResponse(responseData)
            }
        })
    })
})

export const { useGetUsersQuery } = extendedApiSlice

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
            return {
                id: userId,
                type: UserType.ADMIN,
                name: "Michael Scott",
                username: "Michael_Scott_Best_Admin",
                avatar: "/react/michael scott.jpg",
                registered: fakeRegistrationDates[usersCount - 1].toLocaleDateString()
            } as User
        } else {
            return {
                id: userId,
                type: UserType.WRITER,
                name: userData.name,
                username: userData.username,
                avatar: `https://picsum.photos/id/${userId * 10}/300/200`,
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