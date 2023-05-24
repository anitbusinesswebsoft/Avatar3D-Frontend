// import Canvas from './canvas/Canvas'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Form from './components/form/Form'
import ChooseBodyType from './pages/ChooseBodyType'
import AdminSection from './pages/AdminSection'
// import Canvas from './pages/Canvas'
import Canvas from './pages/NewCanvas/NewCanvas'



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />     
        <Routes>
          <Route path="/admin" element={<AdminSection/>} />
          <Route path="/" element={<ChooseBodyType />} />
          <Route path="/canvas" element={<Canvas />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
 
