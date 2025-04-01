import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [prueba, setPrueba] = useState<String>('Loading...')

  useEffect(()=> {
    fetch('http://localhost:3000/test') // Fetch de prueba al endpoint /test
    .then(res => res.json())
    .then(data => setPrueba(data.prueba))
    .catch(err => {
      console.error(err)
      setPrueba('Error loading data')
    })
  }, [])

  return (
    <>
      <div>
        <h1>{prueba}</h1>
      </div>
    </>
  )
}

export default App
