import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../components/user/userTypes";
import { usersApi } from "./usersApi";


export const usersAdapter = createEntityAdapter<User>({
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
        builder.addMatcher(usersApi.endpoints.getUsers.matchFulfilled, (_state, action) => {
            return usersAdapter.setAll(initialState, action.payload)
        })
    }
})

export const { currentUserChanged } = usersSlice.actions
export const usersSliceReducer = usersSlice.reducer