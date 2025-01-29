import { useState } from 'react'
import './App.css'
import { useUpdateGameMutation } from './components/game-api-slice'
function App() {
  const [count, setCount] = useState(0)
  //const [startIt, {data, isLoading}] = useUpdateGameMutation()
  //startIt({body: {coordY: 2, coordX: 3, char: "ss"}, gameid: "s"}).unwrap().then((payload) => console.log(payload.message))
  return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
