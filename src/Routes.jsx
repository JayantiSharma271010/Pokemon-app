import React from 'react'
import App from './App'
import { BrowserRouter as Router, Routes,Route  } from 'react-router-dom';
import PokemonDetails from './PokemonDetails/PokemonDetails'

const AppRoutes = () => {
  return (
<Router>
    <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/pokemon/:id' element={<PokemonDetails/>}/>
    </Routes>
</Router>
  )
}

export default AppRoutes