import e from "express";
import jwt from "jsonwebtoken";

const userAuth=async(req,res,next)=>{
    const{token}=req.cookies;

    if(!token){
        return res.json({success:false,message:'please login first'});
    }

    try{
          
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
       if(decoded){
        req.body.userId=decoded.id;
       }else{
        return res.json({success:false,message:'token is not valid'});
       }

       next();


    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export default userAuth;