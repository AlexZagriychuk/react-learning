import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User, getAllUsers } from "../../components/user/users";

export interface UsersNormalized {
    [key: number]: User;
}

export interface UsersState {
    activeUserId: number,
    nextUserId: number,
    usersNormalized: UsersNormalized
}

const generateInitialState = () : UsersState => {
    const allUsers = getAllUsers()

    const usersNormalized = allUsers.usersData.reduce((acc, user) => {
        acc[user.id] = user
        return acc
    }, {} as UsersNormalized)

    return {
        activeUserId: 1,
        nextUserId: allUsers.nextUserId,
        usersNormalized
    }
}

export const usersSlice = createSlice({
    name: "users",
    initialState: generateInitialState(),
    reducers: {
        currentUserChanged: (state, action: PayloadAction<number>) => {
            state.activeUserId = action.payload
        }
    }
})

export const selectCurrentUserId = (state: RootState) => state.users.activeUserId
export const selectAllUsersNormalized = (state: RootState) => state.users.usersNormalized

export const { currentUserChanged } = usersSlice.actions
export default usersSlice.reducer