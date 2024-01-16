import { useState} from "react";
import { Form, Button} from "react-bootstrap";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import FormContainer from '../../Components/FormContainer.jsx';
import Loader from '../../Components/Loader.jsx';
import {useAdminadduserMutation} from '../../slices/AdminApiSlice.js'




const AdminAddUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const [adduser,{isLoading}]=useAdminadduserMutation();


    const submitHndler = async (e) =>{
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
        if (password !== confirmPassword) {
            toast.error("Password do not match!");
          } 
          else {
            try {
              await adduser({ name, email, password}).unwrap();
              navigate("/admin/dashboard");
            } catch (err) {
              toast.error(err?.data?.message || err?.error);
            }
          }
    }




  return (
    <FormContainer>

    <h1>Add New User</h1>

    <Form onSubmit={submitHndler}>

      <Form.Group className="my-2" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="my-2" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>


      <Form.Group className="my-2" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="my-2" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Form.Group>

     
     
      {isLoading&& <Loader/>}

      <Button type="submit" variant="primary" className="mt-3">
        Add
      </Button>
    </Form>
  </FormContainer>
  )
}

export default AdminAddUser