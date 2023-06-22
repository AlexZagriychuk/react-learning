import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiErrorData, ApiErrorComponent } from "../../../components/error/ApiError";


export const apiErrorsSlice = createSlice({
    name: "api_errors",
    initialState: {
        nextErrorId: 0,
        errors: {} as { [key: number]: ApiErrorData; }
    },
    reducers: {
        apiErrorCaught: function (state, action: PayloadAction<{ errorText: string; errorComponent: ApiErrorComponent; }>) {
            const errorId = state.nextErrorId;
            state.nextErrorId++;
            state.errors[errorId] = { errorId, ...action.payload };
        },
        apiErrorClosed: function (state, action: PayloadAction<number>) {
            delete state.errors[action.payload];
        }
    },
});

export const { apiErrorCaught, apiErrorClosed } = apiErrorsSlice.actions;
export const apiErrorsSliceReducer = apiErrorsSlice.reducer;
