import { useGetTodosByUserIdQuery } from "../../../redux/modules/usersSlice"
import { User } from "../users"
import { ToDoItem } from "../../todo/todo"
import ToDoListItem from "../../todo/ToDoListItem"

export default function UserDetailsToDo({user}: {user: User}) {
    const {data: todos, isLoading, isError, error} = useGetTodosByUserIdQuery(user.id) 

    let content
    if (isError) {
        content = "An error has occurred: " + error
    } else if (isLoading) {
        content = <p>Loading...</p>
    } else if (todos === undefined) {
        content = <p>No todo available for this user</p>
    } else {
        content = (
            <ul className="todo-list">
                {todos.map((toDoItem: ToDoItem) => 
                    <ToDoListItem key={toDoItem.id} toDoItem={toDoItem} enableEditing={false} />
                )}
            </ul>
        )
    }

    return (
        <>
            {content}
        </>
    )
}