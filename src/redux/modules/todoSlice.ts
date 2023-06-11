import { EntityId, EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ToDoItem, getNextToDoId } from "../../components/todo/todo";
import { apiSlice } from "./apiSlice";
import { RootState } from "../store";


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: (responseData: []) => {
                return responseData as ToDoItem[]
            }
        })
    })
})

export const { useGetTodosQuery } = extendedApiSlice

export interface UserWithToDo {
    id: EntityId;
    toDoIds: EntityId[];
}
interface TodosState {
    users: EntityState<UserWithToDo>;
    todos: EntityState<ToDoItem>;
    nextToDoId: number
}

const usersWithToDoAdapter = createEntityAdapter<UserWithToDo>();
const toDoAdapter = createEntityAdapter<ToDoItem>();

const initialState : TodosState =  {
    users: usersWithToDoAdapter.getInitialState(),
    todos: toDoAdapter.getInitialState(),
    nextToDoId: 1
}

const normalizeTodoData = (toDoData : ToDoItem[]) => {
    const nextToDoId = getNextToDoId(toDoData)

    const usersWithToDoGroupedByUserId = toDoData.reduce((acc, currToDo : ToDoItem) => {
        let userId = currToDo.userId
        let userWithToDo = acc[userId]
        if(!userWithToDo) {
            userWithToDo = {id: userId, toDoIds: []}
            acc[userId] = userWithToDo
        }

        userWithToDo.toDoIds.push(currToDo.id)

        return acc
    }, {} as {[key: number]: UserWithToDo})

    let usersWithToDoAdapterState = usersWithToDoAdapter.getInitialState()
    usersWithToDoAdapterState = usersWithToDoAdapter.setMany(usersWithToDoAdapterState, Object.values(usersWithToDoGroupedByUserId))
    let toDoAdapterState = toDoAdapter.getInitialState()
    toDoAdapterState = toDoAdapter.setMany(toDoAdapterState, toDoData)

    return {
        users: usersWithToDoAdapterState,
        todos: toDoAdapterState,
        nextToDoId
    }
}


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        toDoCompletionToggled: function(state, action: PayloadAction<number>) {
            const toDoId = action.payload
            const toDoItem = state.todos.entities[toDoId]

            if(!toDoItem) {
                console.error(`Cannot perform action toDoCompletionToggled, because todo with id ${toDoId} has not been found in the Redux state`)
                return
            }

            toDoAdapter.updateOne(state.todos, { id: toDoId, changes: { completed: !toDoItem.completed } })
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(extendedApiSlice.endpoints.getTodos.matchFulfilled, (_state, action) => {
            return normalizeTodoData(action.payload)
        })
    }
})

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

export const { toDoCompletionToggled } = todoSlice.actions
export default todoSlice.reducer
