import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ToDoItem, getAllToDoData } from "../../components/todo/todo";

export interface ToDoItemsForUserNormalized {
    [key: number] : ToDoItem
}

export interface TodoDataNormalized {
    [key: number] : ToDoItemsForUserNormalized
}

export interface TodosState {
    nextToDoId: number,
    todoDataNormalized: TodoDataNormalized
}

const generateInitialState = () : TodosState => {
    const toDoData = getAllToDoData()

    const todoDataNormalized = toDoData.reduce((acc, currToDoItemsForUser) => {
        const toDoItemsForUserNormalized = currToDoItemsForUser.todoData.reduce((acc2, currToDoItem) => {
            acc2[currToDoItem.id] = currToDoItem
            return acc2
        }, {} as ToDoItemsForUserNormalized)

        acc[currToDoItemsForUser.userId] = toDoItemsForUserNormalized
        return acc
    }, {} as TodoDataNormalized) 

    const nextToDoId = 1

    return {
        nextToDoId,
        todoDataNormalized
    }
}


export const todoSlice = createSlice({
    name: "todo",
    initialState: generateInitialState(),
    reducers: {
        toDoCompletionToggled: function(state, action: PayloadAction<{userId: number, postId: number}>) {
            const toDoItem = state.todoDataNormalized[action.payload.userId][action.payload.postId]
            toDoItem.completed = !toDoItem.completed
        }
    }
})

export const selectToDoDataNormalized = (state: RootState) => state.todo.todoDataNormalized

export const { toDoCompletionToggled } = todoSlice.actions
export default todoSlice.reducer
