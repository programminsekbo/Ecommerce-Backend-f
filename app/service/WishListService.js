import mongoose from "mongoose";
import WishModel from "../model/wishesModel.js";
const ObjectId=mongoose.Types.ObjectId;






export const CreateWishService= async (req) => {

    try{
       let user_id=req.headers['user_id']
       let {productID}=req.body;
       let postJSON={
        productID:productID,
        userID:user_id
       }

       await  WishModel.updateOne(postJSON,{$set:postJSON},{upsert:true})
       
       
        return {status:"success",message:"create Successfully"}
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}




    
export const ReadWishService=async (req)=>{
    try {
        let user_id=new ObjectId(req.headers.user_id);
        let MatchStage={$match:{userID:user_id}}

        let JoinStageProduct= {$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}};

        let data=await  WishModel.aggregate([
            MatchStage,
            JoinStageProduct
        ])
        return {status:"success",message:"Read Successfully",data:data};
      
        } catch (error) {
            return {status:"fail",data:error.toString()}
      }
}









export const RemoveWishService= async (req) => {

    try{
       let user_id=req.headers['user_id']
       let {productID}=req.body;
       let postJSON={
        productID:productID,
        userID:user_id
       }

       await  WishModel.deleteOne(postJSON)
       
       
        return {status:"success",message:"Remove Successfully"}
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}





