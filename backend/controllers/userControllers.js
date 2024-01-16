import asyncHandler from 'express-async-handler';
import generateToken from '../Utils/generateToken.js'
import User from '../Models/UserModel.js';




const authUser =asyncHandler(async (req,res)=>{

  const {email , password} = req.body;
  
  const user = await User.findOne({email})
  if(user && (await user.matchPassword(password))){
    generateToken(res , user._id);
    res.status(201).json({ //201 ok , but something created
        _id:user.id,
        name:user.name,
        email:user.email
    });
}else{
    res.status(401); //401 unauthorised
    throw new Error('Invalid email or password')
}
}) ;





const regUser =asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {name , email , password} = req.body
    
    const userExists = await User.findOne({email:email});
    if(userExists){
    res.status(400);
    throw new Error('user already exists..');
    }
 
    const user = await User.create({
        name :name,
        email:email,
        password:password
    })
    if(user){
        generateToken(res , user._id);
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }

   
}) ;


const logoutUser =asyncHandler(async (req,res)=>{
    res.cookie('jwt' , '' , {
        httpOnly:true,
        expires:new Date(0),
    });
    console.log("user logged out");
    res.status(200).json({message:"user logged out !"})
}) ;



const getUserProfile =asyncHandler(async (req,res)=>{
    console.log("lllll" , req.user);
    const user ={
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json({message:"user profile"})
}) ;



const UpdateUserProfile =asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email ||user.email;
        if(req.body.password){
            user.password = req.body.password
        }

      

        const updated = await user.save();
        res.status(200).json({
            _id:updated._id,
            name:updated.name,
            email:updated.email,
            
        })
    }else{
        res.status(404);
        throw new Error('user not found..')
    }
    res.status(200).json({message:"user profile update"})
}) ;



export {
    authUser,regUser,logoutUser,getUserProfile ,UpdateUserProfile

};