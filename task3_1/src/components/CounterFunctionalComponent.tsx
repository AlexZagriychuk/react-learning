import { useState } from "react"

interface CounterFunctionalComponentProps {
    initialCount: number
}

function CounterFunctionalComponent({initialCount} : CounterFunctionalComponentProps) {
    const [count, setCount] = useState<number>(initialCount)

    return (
        <div>
            <h2>CounterFunctionalComponent</h2>
            <button onClick={() => setCount((count) => count + 1)}>Increment count</button>
            <div>Count is: {count}</div>
        </div>
    )
}

export default CounterFunctionalComponent
