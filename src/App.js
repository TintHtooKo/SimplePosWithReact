import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import PosPage from './pages/PosPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/pos' element={<PosPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
