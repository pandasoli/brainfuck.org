import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import From from './pages/from'
import To from './pages/to'


const App = () =>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home/> }/>
      <Route path='/from' element={ <From/> }/>
      <Route path='/to' element={ <To/> }/>
    </Routes>
  </BrowserRouter>


export default App