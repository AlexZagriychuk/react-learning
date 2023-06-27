import { UseFormRegister } from "react-hook-form"
import { User } from "../../user/userTypes"
import { getUnknownUser } from "../../user/userUtils"
import { useLayoutEffect, useRef } from "react"
import styles from "./PostFormFields.module.css"
import { IPostFormInput } from "../PostForm"


interface PostFormFieldsProps {
    postUser: User,
    editingPost: boolean,
    register: UseFormRegister<IPostFormInput>
}

export default function PostFormFields({postUser, editingPost, register} : PostFormFieldsProps ) {    
    let textAreaRef = useRef(null as HTMLTextAreaElement | null)
    
    const changeTextAreaHeightBasedOnScrollHeight = (textarea: HTMLTextAreaElement) => {
        // Changes textarea element height to fit content + 5px to avoid showing vertical scroll
        textarea.style.height = ""; 
        textarea.style.height = textarea.scrollHeight + 5 + "px" 
    }
    // Change initial textArea height on 1st render (to avoid the visible first height change on the first textAreaRef onInput event)
    useLayoutEffect(() => {
        if(textAreaRef.current) {
            changeTextAreaHeightBasedOnScrollHeight(textAreaRef.current)
        }
    }, [])
    
    const unknownUser = getUnknownUser() 
    const { ref: postBodyRef, ...postBodyRest } = register("postBody")

    return (
        <div className={styles["post-form-content"]}>
            {postUser === unknownUser 
                ? <h3 className={styles["post-form-content-title-error"]}>Cannot create a post for unknown user</h3>
                : <>
                    <h3 className={styles["post-form-content-title-edit"]}>{editingPost ? "Updating Post" : "Creating Post"}</h3>
                    <label>Title</label>
                    <input className={styles["post-form-content-title-input"]} {...register("postTitle")} required></input>
                    <label>Post</label>
                    <textarea 
                        className={styles["post-form-content-body-input"]}
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
    )
}