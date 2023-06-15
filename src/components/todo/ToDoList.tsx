import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectAllToDoByUserId, selectToDoApiError, toDoApiErrorClosed, useGetTodosQuery } from "../../redux/modules/todoSlice"
import { selectCurrentUserId } from "../../redux/modules/usersSlice"
import "./ToDoList.css"
import { ToDoItem } from "./todo"
import ToDoListItem from "./ToDoListItem"

export default function ToDoList() {
    const {isLoading, isError, error } = useGetTodosQuery(undefined)

    const dispatch = useAppDispatch()
    const currentUserId = useAppSelector(selectCurrentUserId)
    const toDoDataForCurrentUser = useAppSelector(state => selectAllToDoByUserId(state, currentUserId))
    const noToDoDataAvailable = !toDoDataForCurrentUser || (Array.isArray(toDoDataForCurrentUser) && toDoDataForCurrentUser.length === 0)
    const toDoApiError = useAppSelector(selectToDoApiError)

    let content
    if (isError) {
        content = "An error has occurred: " + error
    } else if (isLoading) {
        content = <p>Loading...</p>
    } else if (noToDoDataAvailable) {
        content = <p>No todo available for this user</p>
    } else {
        content = (
            <ul className="todo-list">
                {toDoDataForCurrentUser.map((toDoItem: ToDoItem) => 
                    <ToDoListItem key={toDoItem.id} toDoItem={toDoItem} />
                )}
            </ul>
        )
    }

    return (
        <>
            <h2>ToDo List:</h2>
            {toDoApiError.length > 0 && <div className="todo-api-error">
                <p><b>API error text:</b><br />{toDoApiError}</p>
                <div id="todo-api-error-close-btn" onClick={() => dispatch(toDoApiErrorClosed())}></div>
            </div>}
            {content}
        </>
    )
} 