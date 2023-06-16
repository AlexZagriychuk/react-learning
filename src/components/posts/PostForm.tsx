import { useForm, SubmitHandler } from "react-hook-form"
import { User, getUnknownUser } from "../user/users"
import { selectCurrentUser } from "../../redux/modules/usersSlice"
import { useAppSelector } from "../../redux/hooks"
import { dateDiffAsString } from "../../utils/DateUtils"
import { Post } from "./posts"
import { useLayoutEffect, useRef } from "react"
import { selectNextPostId, useAddPostMutation } from "../../redux/modules/postsSlice"


interface IFormInput {
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
    const [addPost] = useAddPostMutation()
    
    const changeTextAreaHeightBasedOnScrollHeight = (textarea: HTMLTextAreaElement) => {
        // Changes textarea element height to fit content + 5px to avoid showing vertical scroll
        textarea.style.height = ""; 
        textarea.style.height = textarea.scrollHeight + 5 + "px" 
    }
    // Change initial textArea height on 1st render (to avoid the visible first height change on the first textAreaRef onInput event)
    let textAreaRef = useRef(null as HTMLTextAreaElement | null)
    useLayoutEffect(() => {
        if(textAreaRef.current) {
            changeTextAreaHeightBasedOnScrollHeight(textAreaRef.current)
        }
    }, [])
    
    const unknownUser = getUnknownUser() 
    let currentUser = useAppSelector(selectCurrentUser) || unknownUser
    const nextPostId = useAppSelector(selectNextPostId)

    const editingPost = postToEditAndUser !== null
    const postUser = postToEditAndUser?.user || currentUser
    const postDate = postToEditAndUser?.post.date || new Date().toLocaleString()

    const defaultValues = {
        postTitle: postToEditAndUser?.post.title || "",
        postBody: postToEditAndUser?.post.body || ""
    }

    const { register, handleSubmit } = useForm<IFormInput>({defaultValues })
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if(editingPost) {
            console.error("POST editing is not implemented yet")
        } else {
            const newPost = {
                userId: postUser.id,
                id: nextPostId,
                date: new Date().toLocaleString(),
                body: data.postBody.toString(),
                title: data.postTitle.toString()
            }
            addPost(newPost)
        }

        onPostAddOrEditClosed()
    }
    const { ref: postBodyRef, ...postBodyRest } = register("postBody")

    return (
        <form className="updating-or-adding-post" onSubmit={handleSubmit(onSubmit)}>
            <li>
                <div className="post-user-data">
                    <img src={postUser.avatar} alt="" className="post-user-img" />
                    <span className="post-user-name">{postUser.username}</span>
                    <span className="post-user-type">({postUser.type})</span>
                    <span className="post-user-registered">Registered:<br/>{postUser.registered}</span>
                </div>

                <div className="post-content">
                    {postUser === unknownUser 
                        ? <h3 className="post-content-title-error">Cannot create a post for unknown user</h3>
                        : <>
                            <h3 className="post-content-title-edit">{editingPost ? "Updating Post" : "Creating Post"}</h3>
                            <label>Title</label>
                            <input className="post-content-title-input" {...register("postTitle")} required></input>
                            <label>Post</label>
                            <textarea 
                                className="post-content-body-input"
                                {...postBodyRest}
                                required
                                ref={(elem) => {
                                    postBodyRef(elem)
                                    textAreaRef.current = elem
                                }}                             
                                onInput={(e) => changeTextAreaHeightBasedOnScrollHeight(e.target as HTMLTextAreaElement)}
                            ></textarea>
                        </>
                    }
                </div>

                <div className="post-date-and-controls">
                    {editingPost && (
                        <>
                            <span><i>Posted:</i><br/>{postDate}<br/></span>
                            <span className="post-date-diff">({dateDiffAsString(new Date(postDate))} ago)</span>
                        </>
                    )}
                    <input type="submit" className="posts-page-btn" value={editingPost ? "Edit" : "Create"} />
                    <input type="reset" className="posts-page-btn" value="Cancel" onClick={() => onPostAddOrEditClosed()} />
                </div>
            </li>
        </form>
    )
}