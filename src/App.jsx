
import { Routes, Route } from "react-router-dom"
import Account from "./pages/Account"
import Calculator from "./pages/Calculator"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Layout from "./Layout"
import Login from "./components/Login"

function App() {


  return (
    <>

      <Routes >
        <Route element={<Layout />}>
          <Route path="/" element={<Account />} />
          <Route path="/Calculator" element={<Calculator />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Products" element={<Products />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
