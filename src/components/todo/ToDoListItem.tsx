import { useCallback } from "react";
import { toDoCompletionToggled, useUpdateTodoMutation } from "../../redux/modules/todoSlice";
import { ToDoItem } from "./todo";
import { debounce } from "ts-debounce";
import { useAppDispatch } from "../../redux/hooks";

export default function ToDoListItem({toDoItem} : {toDoItem: ToDoItem}) {
    const [updateTodo] = useUpdateTodoMutation()
    const dispatch = useAppDispatch()
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
    return (
        <li>
            <div className={"todo-item-text" + (toDoItem.completed ? " completed" : "")}>{toDoItem.title}</div>
            <input 
                className="todo-item-finished" 
                type="checkbox" 
                checked={toDoItem.completed} 
                onChange={() => handleCompletedChange(toDoItem)}
            />
        </li>
    )
}