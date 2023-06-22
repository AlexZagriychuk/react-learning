import { useAppSelector } from "../../../redux/hooks"
import { selectAllToDoByUserId } from "../../../redux/modules/todo"
import { useGetTodosQuery } from "../../../redux/modules/todo"
import { selectCurrentUserId } from "../../../redux/modules/users"
import styles from "./ToDoList.module.css"
import { ToDoItem } from "../todoTypes"
import ToDoListItem from "../ToDoListItem"
import { selectApiErrorsByComponent } from "../../../redux/modules/common_api"
import { ApiErrorComponent } from "../../error/ApiError/types"
import ApiError from "../../error/ApiError"

export default function ToDoList() {
    const {isLoading, isError, error } = useGetTodosQuery()

    const currentUserId = useAppSelector(selectCurrentUserId)
    const toDoDataForCurrentUser = useAppSelector(state => selectAllToDoByUserId(state, currentUserId))
    const noToDoDataAvailable = !toDoDataForCurrentUser || (Array.isArray(toDoDataForCurrentUser) && toDoDataForCurrentUser.length === 0)
    const toDoApiErrors = useAppSelector(state => selectApiErrorsByComponent(state, ApiErrorComponent.TODOS))

    let content
    if (isError) {
        content = "An error has occurred: " + error
    } else if (isLoading) {
        content = <p>Loading...</p>
    } else if (noToDoDataAvailable) {
        content = <p>No todo available for this user</p>
    } else {
        content = (
            <ul className={styles["todo-list"]}>
                {toDoDataForCurrentUser.map((toDoItem: ToDoItem) => 
                    <ToDoListItem key={toDoItem.id} toDoItem={toDoItem} enableEditing={true} />
                )}
            </ul>
        )
    }

    return (
        <>
            <h2>ToDo List:</h2>
            {toDoApiErrors.map(toDoApiError => <ApiError key={toDoApiError.errorId} {...toDoApiError} />)}
            {content}
        </>
    )
} 