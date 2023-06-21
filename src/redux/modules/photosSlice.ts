import { apiSlice } from "./apiSlice";

export interface Photo {
    "albumId": number,
    "id": number,
    "title": string,
    "url": string,
    "thumbnailUrl": string
}

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
