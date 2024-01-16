import React , {useState,useEffect} from 'react'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {useDeleteUserMutation} from '../../slices/AdminApiSlice';
import './adminTable.css'



const Admindashboard = () => {


  const [user,setUser]=useState([]);
  const [search,setSearch]=useState('')

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [deleteUserApi,{isLoading}]=useDeleteUserMutation();



  useEffect(()=>{
    const fetchUsers = async ()=>{
      try {
        const response = await fetch('/api/admin/dashboard');
        const data = await response.json();
        if (response.ok) {
          setUser(data.users);
        } else {
          console.error(data.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    } 
    fetchUsers();
   
  } , []);



const deleteHandler = async (id)=>{
  try {
            const res= await deleteUserApi({id}).unwrap();
            toast.success("Deleted Successfully")
            navigate("/admin/dashboard")
  } catch (error) {
    toast.error("Error while deleting")
  }
}


const editUser = async(id)=>{
  navigate(`/admin/editUser/${id}`)
}


const handleAddUser=async()=>{
  try {
    navigate('/admin/addUser')
  } catch (err) {
    console.error('Error while Navigating:', err.message);
  }
}


const handleSearch= async()=>{
  try {
      const responsed = await fetch(`/api/admin/dashboard?search=${search}`);
      const data = await responsed.json();
     
      if (responsed.ok) {
          setUser(data.users)
          console.log(data.users);
        } else {
          console.error(data.message || 'Failed to fetch users');
        }
  } catch (error) {
      console.error('Error searching user:' , error.message)
  }
}


  return (
   <>
    <h1>Dashboard</h1>

    <Container className="mt-5">
      <Row>
        <Col sm={4}>
    <Form className="d-flex">
            <Form.Control
              name='search'
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value)
               
              }}
            />
            <Button onClick={handleSearch}>
              Search
            </Button>
            

      </Form>
        </Col>
        
      </Row>
    </Container>
    
    <br /><br />


    <Button onClick={handleAddUser}>Add User</Button>
  
     <br /><br />

    <table className="admin-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {user.map((user,index) => (
          <tr key={user._id}>
            <td>{index+1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button className="edit-button" onClick={()=>{editUser(user._id)}} >Edit</button>
              <button className="delete-button" onClick={()=>{deleteHandler(user._id)}}>Delete</button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   </>
  )
}

export default Admindashboard