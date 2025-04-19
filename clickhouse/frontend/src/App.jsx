import { useState } from 'react' 
import './App.css'
import IngestionUI from './pages/IngestionUI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       <IngestionUI/>
    </div>
  )
}

export default App
