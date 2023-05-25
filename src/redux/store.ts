import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './modules/counterSlice'
import usersSlice from './modules/usersSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        users: usersSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch