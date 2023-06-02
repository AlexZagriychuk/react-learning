export interface ToDoItem {
    id: number;
    userId: number,
    description: string;
    completed: boolean;
}

export const getNextToDoId = (allToDoItems: Array<ToDoItem>) : number => {
    return Math.max(...allToDoItems.map(todo => todo.id)) + 1
}

export function getAllToDoData(): Array<ToDoItem> {
    const todoDataForAllUsers : Array<ToDoItem> = [
        {
            id: 1,
            userId: 1,
            description: "Some task description 1 [user 1]",
            completed: false
        },
        {
            id: 2,
            userId: 1,
            description: "Another task description 2 [user 1]",
            completed: true
        },
        {
            id: 3,
            userId: 1,
            description: "One more task description 3 [user 1]",
            completed: false
        },
        {
            id: 4,
            userId: 2,
            description: "Fist task description [user 2]",
            completed: true
        },
        {
            id: 5,
            userId: 2,
            description: "Some new post idea [user 2]",
            completed: false
        },
        {
            id: 6,
            userId: 4,
            description: "Some single task description [user 4]",
            completed: false
        }
    ]

    return todoDataForAllUsers
}