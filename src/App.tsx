import { Routes, Route } from 'react-router';
import './App.css'
import Greetings from './components/Greetings';
import Home from './components/Home';
import OrderMethod from './components/OrderMethod';

function App() {
  return (
    <div className='p-5 bg-yellow-50 shadow-md text-black rounded-md'>
      <header>
        <h1>Kiosk restauracyjny</h1>
      </header>
      <Routes>
        <Route path="/" element={<Greetings />}></Route>
        <Route path="/order-method" element={<OrderMethod />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes> 
    </div>
  );
}

export default App
