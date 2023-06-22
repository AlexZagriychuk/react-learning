import { Photo } from "../../components/user/UserDetailsAlbumPhoto";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPhotosByAlbumId: builder.query({
            query: (albumId: number) => `/photos?albumId=${albumId}`,
            transformResponse: (responseData: Photo[]) => {
                return responseData
            }
        }),
    })
})

export const { useGetPhotosByAlbumIdQuery } = extendedApiSlice
