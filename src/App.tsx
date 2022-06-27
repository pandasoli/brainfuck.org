import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import From from './pages/from'


const App = () =>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home/> }/>
      <Route path='/from' element={ <From/> }/>
    </Routes>
  </BrowserRouter>


export default App