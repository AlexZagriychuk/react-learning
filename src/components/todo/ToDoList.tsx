import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectAllToDoByUserId, toDoCompletionToggled } from "../../redux/modules/todoSlice"
import { selectCurrentUserId } from "../../redux/modules/usersSlice"
import "./ToDoList.css"
import { ToDoItem } from "./todo"

export default function ToDoList() {
    const dispatch = useAppDispatch()

    const currentUserId = useAppSelector(selectCurrentUserId)
    const toDoDataForCurrentUser = useAppSelector(state => selectAllToDoByUserId(state.todo, currentUserId))
    const noToDoDataAvailable = !toDoDataForCurrentUser || (Array.isArray(toDoDataForCurrentUser) && toDoDataForCurrentUser.length === 0)

    return (
        <>
            <h2>ToDo List:</h2>

            {noToDoDataAvailable
                ? <span>No todo available for this user</span>
                : <ul className="todo-list">
                    {toDoDataForCurrentUser.map((toDoItem: ToDoItem) => {
                        return (
                            <li key={toDoItem.id}>
                                <div className={"todo-item-text" + (toDoItem.completed ? " completed" : "")}>{toDoItem.description}</div>
                                <input className="todo-item-finished" type="checkbox" checked={ toDoItem.completed } onChange={() => {
                                    dispatch(toDoCompletionToggled(toDoItem.id))
                                }} />
                            </li>
                        )
                    })}
                </ul>
            }
        </>
    )
} 