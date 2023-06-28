import { RootState } from "../../store"
import { usersAdapter } from "./usersSlice"

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors((state: RootState) => state.users)

export const selectAllUserEntities = (state: RootState) => state.users.entities
export const selectCurrentUserId = (state: RootState) => state.users.activeUserId
export const selectCurrentUser = (state: RootState) => selectUserById(state, selectCurrentUserId(state))
