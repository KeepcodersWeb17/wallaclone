import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [test, setTest] = useState<String>('Loading...')

  useEffect(()=> {
    fetch('http://localhost:3333/test') // Fetch de test al endpoint /test
    .then(res => res.json())
    .then(data => setTest(data.test))
    .catch(err => {
      console.error(err)
      setTest('Error loading data')
    })
  }, [])

  return (
    <>
      <div>
        <h1>{test}</h1>
      </div>
    </>
  )
}

export default App
