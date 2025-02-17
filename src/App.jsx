import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Contact from "./components/Contact"
import AnimalsPage from "./page/AnimalsPage";
import FeedingSchedulePage from "./page/FeedingSchedulePage";
import VisitorTicketingPage from "./page/VisitorTicketingPage";
import PettingAreaPage from "./page/PettingAreaPage";
import UserManagementPage from "./page/UserManagementPage";
import RegisterPage from "./components/Registration"
import Navbar from "./components/Navbar"


function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/animals" element={<AnimalsPage/>}/>
          <Route path="/feeding-schedule" element={<FeedingSchedulePage/>}/>
          <Route path="/visitor-ticketing" element={<VisitorTicketingPage/>}/>
          <Route path="/petting-area" element={<PettingAreaPage/>}/>
          <Route path="/user-management" element={<UserManagementPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App