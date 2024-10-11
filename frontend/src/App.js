import logo from './logo.svg';
import './App.css';
import Navbar from './CommonComponents/Navbar/navbar';
import HomeScreen from './Pages/HomeScreen/homeScreen';
import Footer from './CommonComponents/Footer/footer';
import {Routes,Route } from 'react-router-dom';
import Status from './Pages/StatusPage/status';
import Report from './Pages/ReportPage/report';
import Presciption from './Pages/Presciption/presciption';
import axios from 'axios';
function App() {

  

  return (
    <div className="App">
      <Navbar/>
      
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/status' element={<Status/>} />
          <Route path='/report/:id' element={<Report/>} />
          <Route path='/prescition/:id' element={<Presciption/>} />
        </Routes>
      

      
      
    </div>
  );
}

export default App;
