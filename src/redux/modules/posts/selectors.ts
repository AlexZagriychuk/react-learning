import { RootState } from "../../store"

export const selectNextPostId = (state: RootState) => state.posts.nextPostId
export const selectPosts = (state: RootState) => state.posts.postsData
