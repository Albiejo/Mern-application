import asyncHandler from 'express-async-handler';
import AdmingenerateToken from '../Utils/AdmingenerateToken.js';
import Admin from '../Models/AdminModel.js';
import Users from '../Models/UserModel.js'
import User from '../Models/UserModel.js';



//admin login
const authAdmin =asyncHandler(async (req,res)=>{

    const {email , password} = req.body;
    const admin = await Admin.findOne({email})
    if(admin && (await admin.matchPassword(password))){
        AdmingenerateToken(res , admin._id);
      res.status(201).json({ //201 ok , but something created
          _id:admin.id,
          name:admin.name,
          email:admin.email,
          message:"admin loggedin"
      });
  }else{
      res.status(401); //401 unauthorised
      throw new Error('Invalid email or password')
  }
  }) ;




  //admin logout
  const logoutAdmin = asyncHandler(async(req,res)=>{
    res.cookie('jwt' , '' , {
        httpOnly:true,
        expires:new Date(0),
    });

    console.log("admin logged out");
    res.status(200).json({message:"admin logged out !"})
  })




  //admindashboard

  const adminDashboard = asyncHandler(async(req,res)=>{
    if (req.query) {
            const search = req.query.search;
            const users = await Users.find({name:{$regex:new RegExp(search , 'i')}});
            if(users){
              res.status(201).json({users})
            }else{
              res.status(401)
              throw new Error("No users Found..")
            }
    } else {
            const  users = await Users.find()
            if(users){
              
              res.status(200).json({users})
            }else{
              res.status(401)
              throw new Error("No users Found..")
            }
    }
  })

  


  //admin delete user 
  const adminDeleteuser = asyncHandler(async(req,res)=>{
    const {id} = req.body;

    try {
      const user = await Users.findById(id)
      if(!user){
        return res.status(404).json({message:"User not Found.."})
      }
      await Users.findByIdAndDelete(id);
      res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
      res.status(500).json({message:"Internal server error.."})
    }
  })



  //admin edit user 
  const adminEditUser = asyncHandler(async(req,res)=>{
    try {
      const {id , name , email} = req.body;
      const updatedUser = await Users.findByIdAndUpdate(id , {name , email});

      if(!updatedUser){
        res.status(404).json({message:"User not found !"})
      }

      res.status(200).json({message:"user info updated !" , user : updatedUser})
      
    } catch (error) {
      res.status(500).json({message:"internal server error.."})
    }
  })


  //getting user details for admin editing..
  const loadEditUser = asyncHandler(async(req,res)=>{
  
    try {
      const id  = req.params.id;
      const user = await Users.findById(id);
      if(user){
        res.status(200).json({user});
      }else{
        console.log("user not found !!");
      }
    } catch (error) {
        res.status(500).json({message:"internal server error.."})
    }
  })


  const adminadduser = asyncHandler(async(req,res)=>{
    const {name , email  , password} = req.body;
    const userExist=await Users.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist!')
    }
    const user=await Users.create({
      name,
      email,
      password
  })
  if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
    })
}else{
    res.status(400)
    throw new Error('Invalid user data!')
}
    
  })

  export {authAdmin , logoutAdmin , adminDashboard , adminDeleteuser , adminEditUser , 
    loadEditUser , adminadduser};