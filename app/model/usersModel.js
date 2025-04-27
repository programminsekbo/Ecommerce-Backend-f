import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
    {
        email:{type:String,unique:true,required:true,lowercase:true},
        otp:{type:String,required:true, default:"0"}
    }
    ,
    {
        timestamps: true,
        versionKey:false,
    }

)


const UserModel =mongoose.model('users',DataSchema);

export default UserModel;