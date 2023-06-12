import { EntityId, EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ToDoItem, getNextToDoId } from "../../components/todo/todo";
import { apiSlice } from "./apiSlice";
import { RootState } from "../store";
import { MaybeDrafted } from "@reduxjs/toolkit/dist/query/core/buildThunks";


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: (responseData: []) => {
                return responseData as ToDoItem[]
            }
        }),
        updateTodo: builder.mutation<ToDoItem, Partial<ToDoItem>>({
            query(data) {
                const { id, ...body } = data

                return {
                    url: `/todos/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            async onQueryStarted(toDoItemChanged: ToDoItem, { dispatch, queryFulfilled }) {
                // Optimistic update
                let toDoItemBeforeMutation
                
                const queryDataChangeAction = dispatch(
                    extendedApiSlice.util.updateQueryData('getTodos', undefined, (draft) => {
                        const draftItem = draft.find(draftItem => draftItem.id === toDoItemChanged.id) as MaybeDrafted<ToDoItem>
                        toDoItemBeforeMutation = {...draftItem} as ToDoItem
                        draftItem.completed = toDoItemChanged.completed
                        return draft
                    })
                )

                toDoItemBeforeMutation = toDoItemBeforeMutation as unknown as ToDoItem

                try {
                    await queryFulfilled
                } catch(e : any) {
                    // Undo state updates on API error
                    const error = e.error
                    const errorMessage = `Could not update todo via API. ${error.error} (${error.originalStatus} - ${error.status})`
                    dispatch(toDoApiErrorCaught(errorMessage))

                    queryDataChangeAction.undo()
                    dispatch(toDoCompletionChanged({toDoId: toDoItemBeforeMutation.id, completed: toDoItemBeforeMutation.completed}))
                }
            },
        }),
    })
})

export const { useGetTodosQuery, useUpdateTodoMutation } = extendedApiSlice

export interface UserWithToDo {
    id: EntityId;
    toDoIds: EntityId[];
}
interface TodosState {
    users: EntityState<UserWithToDo>;
    todos: EntityState<ToDoItem>;
    nextToDoId: number,
    apiError: string,
}

const usersWithToDoAdapter = createEntityAdapter<UserWithToDo>();
const toDoAdapter = createEntityAdapter<ToDoItem>();

const initialState : TodosState =  {
    users: usersWithToDoAdapter.getInitialState(),
    todos: toDoAdapter.getInitialState(),
    nextToDoId: 1,
    apiError: "",
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
        apiError: "",
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
        toDoCompletionChanged: function(state, action: PayloadAction<{ toDoId: number, completed: boolean }>) {
            const toDoId = action.payload.toDoId
            const newCompleted = action.payload.completed
            toDoAdapter.updateOne(state.todos, { id: toDoId, changes: { completed: newCompleted } })
        },
        toDoApiErrorCaught: function(state, action: PayloadAction<string>) {
            state.apiError = action.payload
        },
        toDoApiErrorClosed: function(state) {
            state.apiError = ""
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

export const selectToDoApiError = (state: RootState) => state.todo.apiError

export const { toDoCompletionToggled, toDoCompletionChanged, toDoApiErrorClosed, toDoApiErrorCaught } = todoSlice.actions
export default todoSlice.reducer
