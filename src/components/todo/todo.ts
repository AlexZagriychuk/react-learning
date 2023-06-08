export interface ToDoItem {
    id: number;
    userId: number,
    title: string;
    completed: boolean;
}

export const getNextToDoId = (allToDoItems: Array<ToDoItem>) : number => {
    return Math.max(...allToDoItems.map(todo => todo.id)) + 1
}
