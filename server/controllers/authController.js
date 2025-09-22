import bcrypt from "bcryptjs";  //used to hash password for security purpose
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import nodemailer from "../config/nodemailer.js";

// async and is promise which is type of asyncronous function;
// asyncronous means task we will execute after complete of brfore task only
// syncronous means next task will executed even though before task is running

export const register= async(req, res)=>{ 
    
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.json({success:false, message:'email or password is wrong'});
    }

    try {

        const existingUser=await userModel.findOne({email});

        if(existingUser){
            return res.json({success:false, message:'user already exists'});
        }
        
        const hashedPassword=await bcrypt.hash(password,10);

    const user=new userModel({name,email,password:hashedPassword});

    await user.save();

    const token= jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',  //"development" → when running locally.
                                                     //"production" → when deployed to a live server (Heroku, AWS, Vercel, etc.).
        SameSite: (process.env.NODE_ENV==='production')? 'none':'strict',   //
        maxAge: 7*24*60*60*1000,

    })



    const mailOptions={
        from:process.env.SENDER_EMAIL,
        to:email,
        subject:'Welcome to Our Platform',
        text:`Hello ${name}\n${email},\n\nThank you for registering on our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`
    };

    await nodemailer.sendMail(mailOptions);

     return res.json({success:true,message:'user registered successfully'});
        
    } catch (error) {
       return res.json({success:false, message:error.message});
    }
}

export const login=async(req,res)=>{
      
    const{email,password}=req.body;

    if(!email || !password){
        return res.json({message:'email or password is wrong'});
    }

try {
    const user= await userModel.findOne({email});

    if(!user){
        return res.json({success:false,message:'email or password is wrong'});
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.json({success:false,message:'email or passowrd is wrong'});
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

     res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
         SameSite: (process.env.NODE_ENV==='production')? 'none':'strict',  
        maxAge: 7*24*60*60*1000,

    })
    
    return res.json({success:true,});
} catch (error) {
    return res.json({success:false, message:error.message});
    }
}

export const logout=async(req,res)=>{

    try {
        res.clearCookie('token',{
             httpOnly:true,
        secure:process.env.NODE_ENV==='production',
         SameSite: (process.env.NODE_ENV==='production')? 'none':'strick',  
        })

        return res.json({success:true, message:'user logged Out'})
    } catch (error) {
        return res.json({success:false, message:error.message});
    }
    
    
}

export const sendVerifyOtp=async(req,res)=>{
    try{
      const{userId}=req.body;

      const user=await userModel.findById(userId);

      if(user.isAccountVerified){
        return res.json({success:false,message:"account already exists"});
      }
        const otp=Math.floor(100000 + Math.random()*900000).toString();

        const otpExpireAt=Date.now()+10*60*1000;
        user.verifiyOtp=otp;
        user.verifiyOtpExpireAt=otpExpireAt;

        await user.save();

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Your Account Verification OTP',
            text:`Hello ${user.name},\n\nYour OTP for account verification is: ${otp}\nThis OTP is valid for 10 minutes.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe Team`
        };
        await nodemailer.sendMail(mailOptions);

        return res.json({success:true, message:'otp sent to your email'});
    

        }catch(error){
        return res.json({success:false, message:error.message});
    }
}

export const verifyAccount=async(req,res)=>{
       
    const{userId,otp}=req.body;

    if(!userId || !otp){
        return register.json({success:false,message:'invalid requests'});

    }

    try {
        const user=await userModel.findById(userId);
        
        if(user.isAccountVerified){
            return res.json({success:false,message:'account already verified'});
        }

        if(Date.now()>user.verifiyOtpExpireAt || user.verifiyOtp!==otp || user.verifiyOtp===''){
            return res.json({success:false,message:'invalid or expired otp'});
        }
         
        user.isAccountVerified=true;
        user.verifiyOtp='';
        user.verifiyOtpExpireAt=0;

        await user.save();
        return res.json({success:true,message:'account verified successfully'});

        

}catch(error){
    return res.json({success:false,message:error.message})
}
}

