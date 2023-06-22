import { Photo } from "../../../components/user/UserDetailsAlbumPhoto";
import { baseApiSlice } from "../common_api";

export const photosApi = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getPhotosByAlbumId: builder.query({
            query: (albumId: number) => `/photos?albumId=${albumId}`,
            transformResponse: (responseData: Photo[]) => {
                return responseData
            }
        }),
    })
})

export const { useGetPhotosByAlbumIdQuery } = photosApi
