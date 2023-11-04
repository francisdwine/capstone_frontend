import './App.css';
import {
  BrowserRouter, Routes,
  Route, Redirect, Link,
} from 'react-router-dom';

import { useContext } from 'react';

import Tracker from './pages/dashboard';
import Calendar from './pages/calendar_page';
import MyReservations from './pages/my_reservations';
import AttendanceLogs from './pages/attendance_logs';
import Attendance from './pages/attendance';
import Login from './pages/login_page';

function App() {
  //const user = useContext(something);
  return (
    <div className="App">
      <BrowserRouter> 
      <Routes> 
        {/* <Route path="/" render={() => (!user ? <Redirect to="/" /> : <Login />)} /> */}
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/tracker" element={<Tracker/>}/>
        <Route exact path="/calendar" element={<Calendar/>}/>
        <Route exact path="/logs" element={<AttendanceLogs/>}/>
        <Route exact path="/bookings" element={<MyReservations/>}/>  
        <Route exact path="/attendance" element={<Attendance/>}/>
      </Routes> 
      </BrowserRouter> 
    </div>
  );
}

export default App;
