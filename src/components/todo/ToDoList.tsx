import { useCallback, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectAllToDoByUserId, selectToDoApiError, toDoApiErrorClosed, toDoCompletionToggled, useGetTodosQuery, useUpdateTodoMutation } from "../../redux/modules/todoSlice"
import { selectCurrentUserId } from "../../redux/modules/usersSlice"
import "./ToDoList.css"
import { ToDoItem } from "./todo"
import { debounce } from "ts-debounce";

export default function ToDoList() {
    const {isLoading, isError, error } = useGetTodosQuery(undefined)
    const [updateTodo] = useUpdateTodoMutation()

    const dispatch = useAppDispatch()
    const currentUserId = useAppSelector(selectCurrentUserId)
    const toDoDataForCurrentUser = useAppSelector(state => selectAllToDoByUserId(state, currentUserId))
    const noToDoDataAvailable = !toDoDataForCurrentUser || (Array.isArray(toDoDataForCurrentUser) && toDoDataForCurrentUser.length === 0)
    const toDoApiError = useAppSelector(selectToDoApiError)

    const updateTodoDebounced = useCallback(debounce((toDoItemUpdated: ToDoItem) => {
        // Only fire API mutation if previous and updated versions are not the equal
        // ToDo: add logic to get toDoItemBeforeApiMutation from the API response state
        const toDoItemBeforeApiMutation = {}
        const objectsEqual = JSON.stringify(toDoItemBeforeApiMutation) === JSON.stringify(toDoItemUpdated)

        if(!objectsEqual) {
            updateTodo(toDoItemUpdated)
        }
    }, 1000), []);

    const handleCompletedChange = (toDoItem: ToDoItem) => {
         // Optimistic UI update which will be reversed if API mutation fails
        dispatch(toDoCompletionToggled(toDoItem.id))

        const toDoItemUpdated = {...toDoItem, completed: !toDoItem.completed}
        updateTodoDebounced(toDoItemUpdated)
    }

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
                            <input 
                                className="todo-item-finished" 
                                type="checkbox" 
                                checked={toDoItem.completed} 
                                onChange={() => handleCompletedChange(toDoItem)}
                             />
                        </li>
                    )
                })}
            </ul>
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