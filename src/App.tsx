
import LoginForm from "./components/LoginForm"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"

import PostTable from "./components/PostTable"
function App() {
  return (
    <>
<Router>
<Routes>

  <Route path="/" element={<LoginForm></LoginForm>}></Route>
  <Route path="/posts" element={<PostTable></PostTable>}></Route>
</Routes>
  
</Router>
   
    </>
  )
}

export default App
