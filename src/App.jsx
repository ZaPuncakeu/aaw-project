import { useSelector } from 'react-redux';

import Navbar from "./components/Navbar";

import {
  Routes,
  Route
} from 'react-router-dom';
import Home from "./pages/Home";
import Species from "./pages/Species";
import Attractions from "./pages/Attractions";
import Animals from "./pages/Species/Animals";
import Footer from "./components/Footer";
import Animal from "./pages/Animal";
import Attraction from "./pages/Attraction";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ProtectedUnAuth, ProtectedAuth } from "./components/ProtectedAuth";
import Logout from './pages/Logout';
import { useEffect } from 'react';

export default function App() {
  
  const user = useSelector((state) => state.user.token)

  return (
    <div>
      <Navbar
        user={user}
      />

      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="species">
            <Route index element={<Species/>}/>
            <Route path=":specie" element={<Animals/>}/>
          </Route>
          <Route path="animal/:animalslug" element={<Animal/>}/>
          <Route path="/activities">
            <Route index element={<Attractions/>}/>
            <Route path=":activity" element={<Attraction/>}/>
          </Route>
          <Route path="sign-in" element={<ProtectedUnAuth user={user}><SignIn /></ProtectedUnAuth>}/>
          <Route path="sign-up" element={<ProtectedUnAuth user={user}><SignUp /></ProtectedUnAuth>}/>
          <Route path="logout" element={<ProtectedAuth user={user}><Logout /></ProtectedAuth>}/>
          
        </Route>
      </Routes>

      <Footer/>
    </div>
  )
}