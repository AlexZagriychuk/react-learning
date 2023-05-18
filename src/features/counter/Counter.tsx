import { incremented } from './counterSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

function Counter() {
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()

    return (
        <div>
            <h2>Counter Component With Redux</h2>
            <button onClick={() => dispatch(incremented())}>Increment count</button>
            <div>Count is: {count}</div>
        </div>
    )

}

export default Counter