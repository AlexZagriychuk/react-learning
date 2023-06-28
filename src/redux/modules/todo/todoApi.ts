import { ToDoItem } from "../../../components/todo/todoTypes";
import { apiErrorCaught, baseApiSlice } from "../common_api";
import { ApiErrorComponent } from "../../../components/error/ApiError";
import { MaybeDrafted } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import { toDoCompletionToggled } from ".";


export const todoApi = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query<ToDoItem[], void>({
            query: () => '/todos',
            transformResponse: (responseData: []) => {
                return responseData as ToDoItem[];
            }
        }),
        updateTodo: builder.mutation<ToDoItem, Partial<ToDoItem>>({
            query(data) {
                const { id, ...body } = data;

                return {
                    url: `/todos/${id}`,
                    method: 'PUT',
                    body,
                };
            },
            async onQueryStarted(toDoItemChanged: ToDoItem, { dispatch, queryFulfilled }) {
                // Optimistic state update
                dispatch(toDoCompletionToggled(toDoItemChanged.id));

                let toDoItemBeforeMutation;

                const queryDataChangeAction = dispatch(
                    todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
                        const draftItem = draft.find(draftItem => draftItem.id === toDoItemChanged.id) as MaybeDrafted<ToDoItem>;
                        toDoItemBeforeMutation = { ...draftItem } as ToDoItem;
                        draftItem.completed = toDoItemChanged.completed;
                        return draft;
                    })
                );

                toDoItemBeforeMutation = toDoItemBeforeMutation as unknown as ToDoItem;

                try {
                    await queryFulfilled;
                } catch (e: any) {
                    // Undo state updates on API error
                    const error = e.error;
                    const errorText = `Could not update todo '${toDoItemBeforeMutation.title}' via API. ${error.error} (${error.originalStatus} - ${error.status})`;
                    dispatch(apiErrorCaught({ errorText, errorComponent: ApiErrorComponent.TODOS }));

                    queryDataChangeAction.undo();
                    dispatch(toDoCompletionToggled(toDoItemChanged.id));
                }
            },
        }),
    })
});

export const { useGetTodosQuery, useUpdateTodoMutation } = todoApi;
