import { Navigate, Route, Routes } from "react-router-dom"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import HomePage from "./Pages/home/HomePage"
import { Footer } from "./components/footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"


function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("auth user is here:", user)

  useEffect(() => {
      authCheck();
  }, [authCheck]);

  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 w-10 h-10"></Loader>
        </div>
      </div>
    )
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
      <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />} /> 
    </Routes>
    
    <Footer></Footer>
    
    <Toaster></Toaster>
    </>
  )
  
}

export default App

//<Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />} /> 
//descript: if not authen go signuppage if authen navigate to homepage
