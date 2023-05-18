import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // Case reducers should have meaningful past-tense "event"-style names
        incremented: state => {
            state.value += 1
        }
    }
})

export const selectCount = (state: RootState) => state.counter.value

export const { incremented } = counterSlice.actions
export default counterSlice.reducer