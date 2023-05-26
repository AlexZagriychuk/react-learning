export interface ToDoItem {
    id: number;
    description: string;
    completed: boolean;
}

export interface ToDoItemsForUser {
    userId: number,
    todoData: Array<ToDoItem>
}

export function getAllToDoData(): Array<ToDoItemsForUser> {
    const todoDataForAllUsers : Array<ToDoItemsForUser> = [
        {
            userId: 1,
            todoData: [
                {
                    id: 1,
                    description: "Some task description 1 [user 1]",
                    completed: false
                },
                {
                    id: 2,
                    description: "Another task description 2 [user 1]",
                    completed: true
                },
                {
                    id: 3,
                    description: "One more task description 3 [user 1]",
                    completed: false
                }
            ]
        },
        {
            userId: 2,
            todoData: [
                {
                    id: 4,
                    description: "Fist task description [user 2]",
                    completed: true
                },
                {
                    id: 5,
                    description: "Some new post idea [user 2]",
                    completed: false
                }
            ]
        },
        {
            userId: 4,
            todoData: [
                {
                    id: 6,
                    description: "Some single task description [user 4]",
                    completed: false
                }
            ]
        }
    ]

    return todoDataForAllUsers
}