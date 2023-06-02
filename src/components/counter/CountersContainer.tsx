import CounterClassComponent from './CounterClassComponent'
import CounterFunctionalComponent from './CounterFunctionalComponent'
import Counter from './Counter'

function App() {
  return (
    <>
      <CounterFunctionalComponent initialCount={1000} />
      <CounterClassComponent initialCount={2000} />
      <Counter />
    </>
  )
}

export default App
