import { useGetTodosByUserIdQuery } from "../../../redux/modules/users"
import { User } from "../userTypes"
import { ToDoItem } from "../../todo/todoTypes"
import ToDoListItem from "../../todo/ToDoListItem"
import { toDoListStyles } from "../../todo/ToDoList"

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
            <ul className={toDoListStyles["todo-list"]}>
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