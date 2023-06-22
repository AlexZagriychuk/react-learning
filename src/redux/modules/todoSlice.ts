import { EntityId, EntityState, PayloadAction, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { ToDoItem } from "../../components/todo/todoTypes";
import { getNextToDoId } from "../../components/todo/todoUtils";
import { apiErrorCaught, apiSlice } from "./apiSlice";
import { ApiErrorComponent } from "../../components/error/ApiError";
import { RootState } from "../store";
import { MaybeDrafted } from "@reduxjs/toolkit/dist/query/core/buildThunks";


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query<ToDoItem[], void>({
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
                // Optimistic state update
                dispatch(toDoCompletionToggled(toDoItemChanged.id))
                
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
                    const errorText = `Could not update todo '${toDoItemBeforeMutation.title}' via API. ${error.error} (${error.originalStatus} - ${error.status})`
                    dispatch(apiErrorCaught({errorText, errorComponent: ApiErrorComponent.TODOS}))

                    queryDataChangeAction.undo()
                    dispatch(toDoCompletionToggled(toDoItemChanged.id))
                }
            },
        }),
    })
})

export const { useGetTodosQuery, useUpdateTodoMutation } = extendedApiSlice

interface UserWithToDo {
    id: EntityId;
    toDoIds: EntityId[];
}
interface TodosState {
    users: EntityState<UserWithToDo>;
    todos: EntityState<ToDoItem>;
    nextToDoId: number,
}

const usersWithToDoAdapter = createEntityAdapter<UserWithToDo>();
const toDoAdapter = createEntityAdapter<ToDoItem>();

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

export const selectToDoApiData = extendedApiSlice.endpoints.getTodos.select(undefined)
export const selectAllToDosFromApi = createSelector(
    selectToDoApiData,
    todos => todos?.data ?? [] as ToDoItem[]
)

export const { toDoCompletionToggled } = todoSlice.actions
export default todoSlice.reducer
