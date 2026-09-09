
import { Routes, Route } from "react-router-dom"
import Account from "./pages/Account"
import Calculator from "./pages/Calculator"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Layout from "./Layout"
import Login from "./components/Login"
import Register from "./components/register"

function App() {


  return (
    <>

      <Routes >
        <Route element={<Layout />}>
          <Route path="/Account" element={<Account />} />
          <Route path="/Calculator" element={<Calculator />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Products" element={<Products />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </>
  )
}

export default App
