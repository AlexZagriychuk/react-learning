import { useCallback, useState } from "react";
import { useUpdateTodoMutation } from "../../redux/modules/todoSlice";
import { ToDoItem } from "./todo";
import { debounce } from "ts-debounce";

export default function ToDoListItem({toDoItem, enableEditing} : {toDoItem: ToDoItem, enableEditing: boolean}) {
    const [completed, setCompleted] = useState(toDoItem.completed)
    const [prevToDoItemProp, setPrevToDoItemProp] = useState(toDoItem);

    const [updateTodo] = useUpdateTodoMutation()

    // reset completed state from props if props value of toDoItem changed
    if (toDoItem !== prevToDoItemProp) {
        setPrevToDoItemProp(toDoItem);
        setCompleted(toDoItem.completed)
    }

    const updateTodoDebounced = useCallback(debounce((toDoItemUpdated: ToDoItem) => {    
        // Only fire API mutation if previous and updated ToDo versions are not equal
        const toDoItemHasChanges = JSON.stringify(toDoItem) !== JSON.stringify(toDoItemUpdated)

        if(toDoItemHasChanges) {
            updateTodo(toDoItemUpdated)
        }
    }, 1000), [toDoItem]);

    const handleCompletedChange = (toDoItem: ToDoItem) => {
        // Optimistic UI update which will be reversed if API mutation fails
        setCompleted(!completed)

        const toDoItemUpdated = {...toDoItem, completed: !completed}
        updateTodoDebounced(toDoItemUpdated)
    }

    return (
        <li>
            <div className={"todo-item-text" + (completed ? " completed" : "")}>{toDoItem.title}</div>
            <input 
                className="todo-item-finished" 
                type="checkbox" 
                checked={completed} 
                disabled={!enableEditing}
                onChange={() => handleCompletedChange(toDoItem)}
            />
        </li>
    )
}