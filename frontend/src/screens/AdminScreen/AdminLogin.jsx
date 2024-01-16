import {useDispatch , useSelector} from 'react-redux';
import  { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, } from 'react-bootstrap';
import {toast} from 'react-toastify';
import Loader from '../../Components/Loader.jsx';
import { useAdminLoginMutation } from '../../slices/AdminApiSlice.js';
import {setCredentials} from '../../slices/AdminAuthSlice'
import FormContainer from '../../Components/FormContainer.jsx'


const AdminLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [adminlogin ,  {isLoading} ] = useAdminLoginMutation();
    const { adminInfo } = useSelector((state) => state.adminauth);

    useEffect(() => {
        if (adminInfo) {
          navigate('/admin/dashboard');
        }
      }, [navigate, adminInfo]);



const submitHandler = async (e)=>{
    e.preventDefault();
    try {
      console.log("email and pass :" , email , password);
        const res = await adminlogin({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/admin/dashboard');
    } catch (err) {
    toast.error(err?.data?.message || err.error);
    }

}



  return (
 <FormContainer>
    <h1>Sign In</h1>
    <Form onSubmit={submitHandler}>

    <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
    </Form.Group>

    <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
    </Form.Group>


    <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>

    </Form>

    {isLoading && <Loader />}


 </FormContainer>
  )
}

export default AdminLogin