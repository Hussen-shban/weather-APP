import { useContext, useEffect } from "react"
import Condition from "./component/condition"
import Message from "./component/Message"
import Search from "./component/Search"
import Week from "./component/Week"
import { Data, User } from "./Context"

function App() {
  const hidden=useContext(User)

  return (

    <main className="main-container font-poppins">

      <Search />
      <div className={hidden.sh ? "blok" : "hidden" }>
      <Condition />
      <Week />

      </div>
      <div className={hidden.sh ? "hidden" : "blok" }>
      <Message/>

      </div>

    </main>

  )
}

export default App
