import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectAllToDoByUserId, toDoCompletionToggled, toDoDataFetched } from "../../redux/modules/todoSlice"
import { selectCurrentUserId } from "../../redux/modules/usersSlice"
import "./ToDoList.css"
import { ToDoItem } from "./todo"
import { useQuery } from '@tanstack/react-query';

export default function ToDoList() {
    const dispatch = useAppDispatch()

    const fetchTodos = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos")
        const jsonData = await response.json()
        dispatch(toDoDataFetched(jsonData))
        return jsonData
    }
    const { error, isLoading} = useQuery({queryKey: ["todos"], queryFn: fetchTodos})

    const currentUserId = useAppSelector(selectCurrentUserId)
    const toDoDataForCurrentUser = useAppSelector(state => selectAllToDoByUserId(state.todo, currentUserId))
    const noToDoDataAvailable = !toDoDataForCurrentUser || (Array.isArray(toDoDataForCurrentUser) && toDoDataForCurrentUser.length === 0)

    let content
    if (error) {
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