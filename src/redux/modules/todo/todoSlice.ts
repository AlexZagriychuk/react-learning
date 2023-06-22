import { EntityId, EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ToDoItem } from "../../../components/todo/todoTypes";
import { getNextToDoId } from "../../../components/todo/todoUtils";
import { todoApi } from "./todoApi";


interface UserWithToDo {
    id: EntityId;
    toDoIds: EntityId[];
}
interface TodosState {
    users: EntityState<UserWithToDo>;
    todos: EntityState<ToDoItem>;
    nextToDoId: number,
}

export const usersWithToDoAdapter = createEntityAdapter<UserWithToDo>();
export const toDoAdapter = createEntityAdapter<ToDoItem>();

const initialState : TodosState =  {
    users: usersWithToDoAdapter.getInitialState(),
    todos: toDoAdapter.getInitialState(),
    nextToDoId: 1,
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
        nextToDoId,
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
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(todoApi.endpoints.getTodos.matchFulfilled, (_state, action) => {
            return normalizeTodoData(action.payload)
        })
    }
})

export const { toDoCompletionToggled } = todoSlice.actions
export const todoSliceReducer = todoSlice.reducer
