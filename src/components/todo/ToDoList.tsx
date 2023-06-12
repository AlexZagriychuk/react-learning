import { useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectAllToDoByUserId, selectToDoApiError, toDoApiErrorClosed, toDoCompletionToggled, useGetTodosQuery, useUpdateTodoMutation } from "../../redux/modules/todoSlice"
import { selectCurrentUserId } from "../../redux/modules/usersSlice"
import "./ToDoList.css"
import { ToDoItem } from "./todo"
import { debounce } from "ts-debounce";

export default function ToDoList() {
    const {isLoading, isError, error } = useGetTodosQuery(undefined)
    const [updateTodo] = useUpdateTodoMutation()
    const toDoItemsMutationRef = useRef({} as {[key: number]: {toDoItemBeforeMutation: ToDoItem, updateTodoDebounced: Function} }) 

    const dispatch = useAppDispatch()
    const currentUserId = useAppSelector(selectCurrentUserId)
    const toDoDataForCurrentUser = useAppSelector(state => selectAllToDoByUserId(state, currentUserId))
    const noToDoDataAvailable = !toDoDataForCurrentUser || (Array.isArray(toDoDataForCurrentUser) && toDoDataForCurrentUser.length === 0)
    const toDoApiError = useAppSelector(selectToDoApiError)

    const getUpdateTodoDebounced = (delayInMs: number = 1000) => debounce((toDoItemUpdated: ToDoItem) => {
        // Get toDoItem before mutation and remove it from the ref (we only store it in the ref until this Debounced function is being executed)
        const toDoItemRef = toDoItemsMutationRef.current[toDoItemUpdated.id]
        const toDoItemPrevious = toDoItemRef.toDoItemBeforeMutation
        delete toDoItemsMutationRef.current[toDoItemUpdated.id]

        // Only fire API mutation if previous and updated ToDoItem versions are not the equal 
        // (to avoid sending API requests if for example, Completed for the same ToDoItem toggled 2 times and no actual change happened)
        const objectsEqual = JSON.stringify(toDoItemPrevious) === JSON.stringify(toDoItemUpdated)
        if(!objectsEqual) {
            updateTodo(toDoItemUpdated)
        }
    }, delayInMs)

    const handleCompletedChange = (toDoItem: ToDoItem) => {
        const toDoId = toDoItem.id
        // Optimistic UI update which will be reversed if API mutation fails
        dispatch(toDoCompletionToggled(toDoId))

        // update toDoItemsMutationRef only if this toDoId does not have previously saved toDoItemBeforeMutation and updateTodoDebounced function
        let toDoItemBeforeMutation, updateTodoDebounced
        if(toDoItemsMutationRef.current.hasOwnProperty(toDoId)) {
            const toDoItemRef = toDoItemsMutationRef.current[toDoId]
            toDoItemBeforeMutation = toDoItemRef.toDoItemBeforeMutation
            updateTodoDebounced = toDoItemRef.updateTodoDebounced
        } else {
            toDoItemBeforeMutation = toDoItem
            updateTodoDebounced = getUpdateTodoDebounced()
            toDoItemsMutationRef.current[toDoId] = {toDoItemBeforeMutation, updateTodoDebounced}
        }

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