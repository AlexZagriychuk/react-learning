import { EntityId, EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ToDoItem, getAllToDoData, getNextToDoId } from "../../components/todo/todo";


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

const generateInitialState = () : TodosState => {
    const toDoData = getAllToDoData()
    const nextToDoId = getNextToDoId(toDoData)

    const usersWithToDoGroupedByUserId = toDoData.reduce((acc, currToDo) => {
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
    usersWithToDoAdapterState = usersWithToDoAdapter.addMany(usersWithToDoAdapterState, Object.values(usersWithToDoGroupedByUserId))
    let toDoAdapterState = toDoAdapter.getInitialState()
    toDoAdapterState = toDoAdapter.addMany(toDoAdapterState, toDoData)

    return {
        users: usersWithToDoAdapterState,
        todos: toDoAdapterState,
        nextToDoId
    }
}


export const todoSlice = createSlice({
    name: "todo",
    initialState: generateInitialState(),
    reducers: {
        toDoCompletionToggled: function(state, action: PayloadAction<number>) {
            const toDoItem = selectToDoById(state, action.payload)
            if(!toDoItem) {
                console.error(`Cannot perform action toDoCompletionToggled, because todo with id ${action.payload} has not been found in the Redux state`)
                return
            }

            toDoAdapter.updateOne(state.todos, { id: action.payload, changes: { completed: !toDoItem.completed } })
        }
    }
})

export const {
    selectIds: selectIdsOfUsersWithPosts,
    selectById: selectPostIdsByUserId
} = usersWithToDoAdapter.getSelectors((state: TodosState) => state.users);
  
export const { 
    selectById: selectToDoById,
} = toDoAdapter.getSelectors((state: TodosState) => state.todos);

export const selectAllToDoByUserId = (state: TodosState, userId: number): Array<ToDoItem> => {
    const postIds = selectPostIdsByUserId(state, userId)
    if(!postIds) {
        return []
    }

    return postIds.toDoIds.map(toDoId => selectToDoById(state, toDoId) as ToDoItem)
}

export const { toDoCompletionToggled } = todoSlice.actions
export default todoSlice.reducer
