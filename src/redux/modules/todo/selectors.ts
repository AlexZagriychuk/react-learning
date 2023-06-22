import { ToDoItem } from "../../../components/todo/todoTypes";
import { RootState } from "../../store";
import { todoApi } from "./todoApi";
import { toDoAdapter, usersWithToDoAdapter } from "./todoSlice";
import { createSelector } from "@reduxjs/toolkit";

export const {
    selectIds: selectIdsOfUsersWithPosts,
    selectById: selectPostIdsByUserId
} = usersWithToDoAdapter.getSelectors((state: RootState) => state.todo.users);
  
export const { 
    selectById: selectToDoById,
} = toDoAdapter.getSelectors((state: RootState) => state.todo.todos);


export const selectAllToDoByUserId = (state: RootState, userId: number): Array<ToDoItem> => {
    const postIds = selectPostIdsByUserId(state, userId)
    if(!postIds) {
        return []
    }

    return postIds.toDoIds.map(toDoId => selectToDoById(state, toDoId) as ToDoItem)
}

export const selectToDoApiData = todoApi.endpoints.getTodos.select(undefined)
export const selectAllToDosFromApi = createSelector(
    selectToDoApiData,
    todos => todos?.data ?? [] as ToDoItem[]
)
