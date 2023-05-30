import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User, getAllUsers } from "../../components/user/users";


const usersAdapter = createEntityAdapter<User>({
    sortComparer: (a, b) => a.id - b.id
})

const generateInitialState = () => {
    const allUsers = getAllUsers()

    let state = usersAdapter.getInitialState({
        activeUserId: 1,
        nextUserId: allUsers.nextUserId
    })
    return usersAdapter.addMany(state, allUsers.usersData)
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
export const selectCurrentUser = (state: RootState) => selectUserById(state, selectCurrentUserId(state))

// Export the customized selectors for this adapter
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors((state: RootState) => state.users)

export const { currentUserChanged } = usersSlice.actions
export default usersSlice.reducer