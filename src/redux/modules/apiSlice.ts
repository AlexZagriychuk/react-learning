import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// We create a single API Slice for the whole app, but store queries in the specific slice files responsible for this module by using:
// apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         queryName: builder.query({...})
//     })
// })
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: () => ({})
})


export enum ApiErrorComponent {
    TODOS,
    POSTS,
    USERS
}

export interface ApiErrorData { 
    errorId: number, 
    errorComponent: ApiErrorComponent, 
    errorText: string 
}

export const apiErrorsSlice = createSlice({
    name: "api_errors",
    initialState: {
        nextErrorId: 0,
        errors: {} as { [key: number]: ApiErrorData}
    },
    reducers: {
        apiErrorCaught: function (state, action: PayloadAction<{errorText: string, errorComponent: ApiErrorComponent}>) {
            const errorId = state.nextErrorId
            state.nextErrorId++
            state.errors[errorId] = { errorId, ...action.payload }
        },
        apiErrorClosed: function(state, action: PayloadAction<number>) {
            delete state.errors[action.payload]
        }
    },
})

export const selectApiErrorsByComponent = (state: RootState, errorComponent: ApiErrorComponent) => {
    return Object.values(state.api_errors.errors).filter(error => error.errorComponent === errorComponent)
}

export const { apiErrorCaught, apiErrorClosed } = apiErrorsSlice.actions
export default apiErrorsSlice.reducer