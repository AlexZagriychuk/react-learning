import { useForm, SubmitHandler } from "react-hook-form"
import { User } from "../../user/userTypes"
import { getUnknownUser } from "../../user/userUtils"
import { selectCurrentUser } from "../../../redux/modules/users"
import { useAppSelector } from "../../../redux/hooks"
import { Post } from "../postsTypes"
import { useLayoutEffect } from "react"
import { useAddPostMutation } from "../../../redux/modules/posts"
import styles from "./PostForm.module.css"
import postsCommonStyles from "../PostsCommon.module.css"
import PostUserData from "../PostUserData"
import PostDate from "../PostDate"
import PostControls from "../PostControls/PostControls"
import PostFormFields from "../PostFormFields"

export interface IPostFormInput {
    postTitle: String
    postBody: String
}

interface PostFormProps {
    postToEditAndUser: {
        post: Post, 
        user: User
    } | null, 
    onPostAddOrEditClosed: Function
}

export default function PostForm({postToEditAndUser, onPostAddOrEditClosed} : PostFormProps ) {    
    const [addPost, { isLoading: isAddPostApiLoading, isSuccess: isAddPostApiSuccess }] = useAddPostMutation()

    // Avoid console error "Cannot update a component (`PostsList`) while rendering a different component (`PostForm`)" on first post add
    useLayoutEffect(() => {
        if(isAddPostApiSuccess) {
            onPostAddOrEditClosed()
        }
    })

    let currentUser = useAppSelector(selectCurrentUser) || getUnknownUser()
    const editingPost = postToEditAndUser !== null
    const postUser = postToEditAndUser?.user || currentUser

    const defaultValues = {
        postTitle: postToEditAndUser?.post.title || "",
        postBody: postToEditAndUser?.post.body || ""
    }

    const { register, handleSubmit } = useForm<IPostFormInput>({defaultValues })
    const onSubmit: SubmitHandler<IPostFormInput> = (data) => {
        if(editingPost) {
            console.error("POST editing is not implemented yet")
        } else {
            const newPost = {
                userId: postUser.id,
                body: data.postBody.toString(),
                title: data.postTitle.toString()
            }
            addPost(newPost)
        }
    }

    return (
        <li className={styles["updating-or-adding-post"]}>
            <form className={postsCommonStyles["posts-list-item"]} onSubmit={handleSubmit(onSubmit)}>
                <div className={postsCommonStyles["post-list-item-left-column"]}>
                    <PostUserData user={postUser} />
                </div>

                <div className={postsCommonStyles["post-list-item-middle-column"]}>
                    <PostFormFields postUser={postUser} editingPost={editingPost} register={register}  />
                </div>

                <div className={postsCommonStyles["post-list-item-right-column"] + " " + styles["center-content-vertically"]}>
                    {editingPost && <PostDate post={postToEditAndUser.post} />}
                    {isAddPostApiLoading
                        ? <div className={postsCommonStyles["loading-spinner"]}></div>
                        : <PostControls isEditingPost={editingPost} onPostAddOrEditClosed={onPostAddOrEditClosed} />
                    }
                </div>
            </form>
        </li>
    )
}