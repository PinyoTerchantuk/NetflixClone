import { Route, Routes } from "react-router-dom"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import HomePage from "./Pages/home/HomePage"
import { Footer } from "./components/footer"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
    <Footer></Footer>
    </>
  )
  
}

export default App
