import { ToDoItem } from "./todoTypes";


export const getNextToDoId = (allToDoItems: ToDoItem[]): number => {
    return Math.max(...allToDoItems.map(todo => todo.id)) + 1;
};
