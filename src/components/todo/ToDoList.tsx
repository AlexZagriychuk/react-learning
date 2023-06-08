import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectAllToDoByUserId, toDoCompletionToggled, useGetTodosQuery } from "../../redux/modules/todoSlice"
import { selectCurrentUserId } from "../../redux/modules/usersSlice"
import "./ToDoList.css"
import { ToDoItem } from "./todo"

export default function ToDoList() {
    const {isLoading, isError, error } = useGetTodosQuery("")
    
    const dispatch = useAppDispatch()
    const currentUserId = useAppSelector(selectCurrentUserId)
    const toDoDataForCurrentUser = useAppSelector(state => selectAllToDoByUserId(state, currentUserId))
    const noToDoDataAvailable = !toDoDataForCurrentUser || (Array.isArray(toDoDataForCurrentUser) && toDoDataForCurrentUser.length === 0)

    let content
    if (isError) {
        content = "An error has occurred: " + error
    } else if (isLoading) {
        content = <p>Loading...</p>
    } else if (noToDoDataAvailable) {
        content = <p>No todo available for this user</p>
    } else {
        content = <ul className="todo-list">
                {toDoDataForCurrentUser.map((toDoItem: ToDoItem) => {
                    return (
                        <li key={toDoItem.id}>
                            <div className={"todo-item-text" + (toDoItem.completed ? " completed" : "")}>{toDoItem.title}</div>
                            <input className="todo-item-finished" type="checkbox" checked={ toDoItem.completed } onChange={() => {
                                dispatch(toDoCompletionToggled(toDoItem.id))
                            }} />
                        </li>
                    )
                })}
            </ul>
    }

    return (
        <>
            <h2>ToDo List:</h2>
            {content}
        </>
    )
} 