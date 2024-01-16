import { useState  , useEffect} from 'react'
import FormContainer from '../../components/FormContainer'
import { Form,Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useAdminUpdateUserMutation} from '../../slices/AdminApiSlice';






const AdminEditUser = () => {

    const {id}=useParams();

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const navigate=useNavigate();
    const [user,setUser]=useState({});


    const [updateUserApis,{isLoading}]=useAdminUpdateUserMutation();

    useEffect(()=>{
        const fetchUser = async ()=>{
             try {
                const response = await fetch(`/api/admin/editUser/${id}`);
                const data = await response.json();
               console.log("hello data is :" ,data);
                if (response.ok) {
                    setUser(data.user);
                    setName(data.user.name)
                    setEmail(data.user.email)
                } else {
                    console.error(data.message || 'Failed to fetch users');
                }

             } catch (error) {
                console.error('Error fetching users:', error.message);
             }
        }
        fetchUser();

    } , [id]);



  

  const submitHandler =async(e)=>{
    e.preventDefault();
    if(name===''){
        toast.error("name cannot be blank")
        return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email===''){
        toast.error("email should not blank")
        return; 
    }
    if (!emailRegex.test(email)) {
        toast.error("Enter valid email")
        return; 
    }

    try {
        const res=await updateUserApis({
            id:id,
            name,
            email,
        }).unwrap();

        toast.success("Profile updated")
        navigate("/admin/dashboard")

    } catch (err) {
        toast.error(err?.data?.message || err.error)
    }
  }






  return (
    <FormContainer>

    <h1>Edit User</h1>

    <Form onSubmit={submitHandler}>

        <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}>  
            </Form.Control>
        </Form.Group>


        <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}>
            </Form.Control>
        </Form.Group>
        
        <Button type="submit" variant="primary" className="mt-3">Update</Button>

    </Form>

    </FormContainer>

  )
}

export default AdminEditUser