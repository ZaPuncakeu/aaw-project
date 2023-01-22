import { useSelector } from 'react-redux';

import Navbar from "./components/Navbar";

import {
  Routes,
  Route
} from 'react-router-dom';
import Home from "./pages/Home";
import Species from "./pages/Species";
import Animals from "./pages/Species/Animals";
import Footer from "./components/Footer";
import Animal from "./pages/Animal";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ProtectedUnAuth, ProtectedAuth } from "./components/ProtectedAuth";
import Logout from './pages/Logout';
import { useConnected } from './requests/auth';
import Admin from './pages/Admin'
import AdminAnimals from './pages/AdminAnimals';
import AddAnimal from './pages/AddAnimal';
import Favourites from './pages/Favourites';
import Search from './pages/Search';
import EditAnimal from './pages/EditAnimal';

export default function App() {
  
  const user = useSelector((state) => state.user.token)
  const { loading } = useConnected();
  
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
          <Route path="favourites" element={<ProtectedAuth user={user === 'user'}><Favourites /></ProtectedAuth>}/>
          <Route path="search" element={<Search/>}/>
          <Route path="sign-in" element={<ProtectedUnAuth user={user}><SignIn /></ProtectedUnAuth>}/>
          <Route path="sign-up" element={<ProtectedUnAuth user={user}><SignUp /></ProtectedUnAuth>}/>
          <Route path="logout" element={<ProtectedAuth user={user}><Logout /></ProtectedAuth>}/>
          <Route path="admin/animals">
            <Route 
              index
              element={
                <ProtectedAuth user={user === 'admin'}>
                  <Admin>
                    <AdminAnimals/>
                  </Admin>
                </ProtectedAuth>
              }
            />

            <Route path="add-animal" element={
              <ProtectedAuth user={user === 'admin'}>
                <Admin>
                  <AddAnimal/>
                </Admin>
              </ProtectedAuth>
            }/>

            <Route path="edit/:slug" element={
              <ProtectedAuth user={user === 'admin'}>
                <Admin>
                  <EditAnimal/>
                </Admin>
              </ProtectedAuth>
            }/>
          </Route>
        </Route>
      </Routes>

      <Footer/>
    </div>
  )
}