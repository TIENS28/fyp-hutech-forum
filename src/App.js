import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import CreatePost from './Pages/CreatePost';
import PersonalPage from './Pages/PersonalPage';
import Setting from './Pages/Setting';
import Save from './Pages/Save';
import ForgotPassword from './Pages/ForgotPassword';
import CreateAccount from './Pages/CreateAccount';
import UpdateProfile from './Pages/UpdateProfile';
import SearchPostList from './Pages/SearchPostList';
import ASearchList from './Pages/ASearchList';
import AdminHomePage from './Pages/AdminHomePage';
import { useUser } from './Components/UserContext';

function App() {
  const { user } = useUser();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const userHasAdminRole = user && user.role && user.role.roleCode === 'ADMIN';

  return (
    <>
      <Router>
        {isNavbarVisible && <Navbar />}
        <Routes>
          <Route
            path='/login' element={<Login />}
          />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/createaccount' element={<CreateAccount />} />
          <Route path='/homepage' element={<Homepage setIsNavbarVisible={setIsNavbarVisible} />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/personal' element={<PersonalPage />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/save' element={<Save />} />
          <Route path='/update' element={<UpdateProfile />} />
          <Route path='/search' element={<SearchPostList setIsNavbarVisible={setIsNavbarVisible} />}/>
          <Route path='/admin/search' element={<ASearchList setIsNavbarVisible={setIsNavbarVisible} />}/>
          <Route path='/admin/home' element={<AdminHomePage setIsNavbarVisible={setIsNavbarVisible} />} />

          {/* {userHasAdminRole ? (
            <Route path='/admin/home' element={<AdminHomePage setIsNavbarVisible={setIsNavbarVisible} />} />
          ) : (
            <Route path="/admin/home" element={<Navigate to="/homepage" />} />
          )} */}
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
