import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import AdminApp from './AdminApp.jsx';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter , createRoutesFromElements , 
  Route , RouterProvider} from 'react-router-dom';
  import store from './store.js';



  //imported all user screens 
  import HomeScreen from './screens/HomeScreen.jsx'
  import LoginScreen from './screens/LoginScreen.jsx'
  import RegisterScreen  from './screens/RegisterScreen.jsx'
  import { Provider } from 'react-redux';
  import ProfileScreen from './screens/ProfileScreen.jsx';
  import PrivateRoute from './Components/Privateroute.jsx';


  //imported all admin screens 
  import AdminLogin from './screens/AdminScreen/AdminLogin.jsx';
  import Admindashboard from './screens/AdminScreen/Admindashboard.jsx';
  import AdminEditUser from  './screens/AdminScreen/AdminEditUser.jsx'
  import AdminAddUser from './screens/AdminScreen/AdminAddUser.jsx'


  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
      <Route path='/' element={<App/>}>
            <Route index={true} path='/' element={<HomeScreen/>}/>
            <Route  path='/login' element={<LoginScreen/>}/>
            <Route  path='/register' element={<RegisterScreen/>}/>

            
            {/* privateRoute */}
            <Route path='' element={<PrivateRoute />}>
                <Route  path='/profile' element={<ProfileScreen/>}/>
            </Route>
      </Route>
      


      <Route path='/admin' element={<AdminApp/>}>
           <Route index={true} path='/admin' element={<AdminLogin/>}/>
           <Route  path='/admin/dashboard' element={<Admindashboard/>}/>
           <Route path='/admin/edituser/:id' element={<AdminEditUser/>}/>
           <Route  path='/admin/addUser' element={<AdminAddUser/>}/>
      </Route>

      </>
     
    )
  );



ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
  </Provider>
)
