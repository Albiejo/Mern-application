import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import {Outlet} from 'react-router-dom' ;
import Header from '../src/Components/AdminComponents/Header.jsx'




const AdminApp = () => {
  return (
    <>
    <Header/>
    <ToastContainer/>
    <Container className='my-2'>
       <Outlet/>
    </Container>
    </>
  )
}

export default AdminApp