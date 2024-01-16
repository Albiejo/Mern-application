import jwt from 'jsonwebtoken';


const generateToken = (res,userId) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn:'30d'
    })

    res.cookie('jwt' , token , {
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge: 30*24*60*60*1000
    });
};


export default generateToken;





//the structure of a jwt has 3 parts sperated by 3 dots...
//header
//payload or body or claims
//signature

//header- contains the type of the token and the algorithm used for signing the token 
//playload - contains the information being conveyed , that is the userinfo , permissions etc .. it will be in base64url  format 
//signature - signature is formed by combining the encoded header , payload  ,  a secret key and with the algorithm specified in the header...
//the signature is to verify the integrity of the token..ie  to make sure that the token is not tampered with...



//the final JWT is formed by concatenating these 3 parts..

//HEADER.PAYLOAD.SIGNATURE