import { configureStore } from "@reduxjs/toolkit"
import { usersSliceReducer } from "./modules/users"
import { postsSliceReducer } from "./modules/posts"
import { todoSliceReducer } from "./modules/todo"
import { apiErrorsSliceReducer, baseApiSlice } from "./modules/common_api"

export const store = configureStore({
    reducer: {
        users: usersSliceReducer,
        posts: postsSliceReducer,
        todo: todoSliceReducer,
        api_errors: apiErrorsSliceReducer,
        [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(baseApiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch