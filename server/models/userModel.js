import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verifiyOtp:{type:String,default:''},
    verifiyOtpExpireAt:{type:Number, default:0},
    isAccountVerified:{type:Boolean,default:false},
    resetOtpExpireAt:{type:Number,default:0},
})

const  userModel= mongoose.models.user || mongoose.model('users',userSchema);

export default userModel;