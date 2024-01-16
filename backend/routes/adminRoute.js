import express from 'express';
const Adminrouter = express.Router();
import {authAdmin , logoutAdmin , adminDashboard , adminDeleteuser , adminEditUser
, loadEditUser , adminadduser} from '../controllers/adminController.js'



Adminrouter.post('/auth'  , authAdmin)
Adminrouter.post('/logout' , logoutAdmin    )
Adminrouter.get('/dashboard' , adminDashboard )
Adminrouter.post('/deleteUser' , adminDeleteuser)
Adminrouter.get('/editUser/:id' , loadEditUser )
Adminrouter.put('/editUser' , adminEditUser)
Adminrouter.post('/adduser' , adminadduser)


export default Adminrouter;