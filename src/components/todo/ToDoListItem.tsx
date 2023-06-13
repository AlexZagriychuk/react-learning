import { useCallback } from "react";
import { selectAllToDosFromApi, toDoCompletionToggled, useUpdateTodoMutation } from "../../redux/modules/todoSlice";
import { ToDoItem } from "./todo";
import { debounce } from "ts-debounce";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function ToDoListItem({toDoItem} : {toDoItem: ToDoItem}) {
    const [updateTodo] = useUpdateTodoMutation()
    const dispatch = useAppDispatch()
    const toDoItemsBeforeApiMutations = useAppSelector(selectAllToDosFromApi)

    const updateTodoDebounced = useCallback(debounce((toDoItemUpdated: ToDoItem, toDoItemsBeforeApiMutations: ToDoItem[]) => {    
        // Only fire API mutation if previous and updated ToDo versions are not the equal
        const toDoItemBeforeApiMutation = toDoItemsBeforeApiMutations.find(todo => todo.id === toDoItemUpdated.id) as ToDoItem
        const toDoItemHasChanges = JSON.stringify(toDoItemBeforeApiMutation) !== JSON.stringify(toDoItemUpdated)

        if(toDoItemHasChanges) {
            updateTodo(toDoItemUpdated)
        }
    }, 1000), []);

    const handleCompletedChange = (toDoItem: ToDoItem) => {
        // Optimistic UI update which will be reversed if API mutation fails
        dispatch(toDoCompletionToggled(toDoItem.id))

        const toDoItemUpdated = {...toDoItem, completed: !toDoItem.completed}
        updateTodoDebounced(toDoItemUpdated, toDoItemsBeforeApiMutations)
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