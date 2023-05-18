import './App.css'
import CounterClassComponent from './components/CounterClassComponent'
import CounterFunctionalComponent from './components/CounterFunctionalComponent'
import Counter from './features/counter/Counter'

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
