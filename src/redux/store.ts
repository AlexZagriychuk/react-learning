import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './modules/counterSlice'
import usersSlice from './modules/usersSlice'
import postsSlice from './modules/postsSlice'
import todoSlice from './modules/todoSlice'
import { apiSlice } from './modules/apiSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        users: usersSlice,
        posts: postsSlice,
        todo: todoSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch