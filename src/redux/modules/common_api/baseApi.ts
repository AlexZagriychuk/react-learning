import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// We create a single API Slice for the whole app, but store queries in the specific slice files responsible for this module by using:
// apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         queryName: builder.query({...})
//     })
// })
export const baseApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://node-jsonplaceholder-clone.fly.dev' }),
    endpoints: () => ({})
})
