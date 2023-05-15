import './App.css'
import CounterClassComponent from './components/CounterClassComponent'
import CounterFunctionalComponent from './components/CounterFunctionalComponent'

function App() {
  return (
    <>
      <CounterFunctionalComponent initialCount={1000} />
      <CounterClassComponent initialCount={2000} />
    </>
  )
}

export default App
