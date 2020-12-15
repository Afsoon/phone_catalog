import { useEffect, useState } from "react"

const getPhones = async () => await fetch("http://localhost:3000/phones", {})

function App() {
  const [state, setState] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const res = await getPhones()
      setState(await res.json())
    }
    fetch()
  }, [])
  return <div className="h-full bg-red-100">{JSON.stringify(state)}</div>
}

export default App
