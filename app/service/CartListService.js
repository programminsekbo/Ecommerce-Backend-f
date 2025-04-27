import CartModel from "../model/cartsModel.js";
import mongoose from "mongoose";
const ObjectId=mongoose.Types.ObjectId;





export const CreateCartService= async (req) => {

    try{
       let user_id=req.headers['user_id']
       let {productID,color,qty,size}=req.body;
       let postJSON={
        productID:productID,
        userID:user_id,
        color:color,
        qty:qty,
        size:size

       }

       await  CartModel.create(postJSON)
       
       
        return {status:"success",message:" Cart create Successfully"}
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}







    
export const ReadCartService=async (req)=>{
    try {
        let user_id=new ObjectId(req.headers.user_id);
        let MatchStage={$match:{userID:user_id}}

        let JoinStageProduct= {$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}};

        let data=await CartModel.aggregate([
            MatchStage,
            JoinStageProduct
        ])
        return {status:"success",message:"Read Successfully",data:data};
      
        } catch (error) {
            return {status:"fail",data:error.toString()}
      }

}







export const RemoveCartService= async (req) => {

    try{
       let user_id=req.headers['user_id']

       let body=req.body;
       body.userID = user_id;

       await  CartModel.deleteOne(body)
       
       
        return {status:"success",message:"Remove Successfully"}
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}









export const UpdateCartService= async (req) => {

    try{
        let user_id=req.headers['user_id']
        let {color,qty,size,id}=req.body;
        let postJSON={
         color:color,
         qty:qty,
         size:size
 
        }
 
       let data= await CartModel.updateOne({userID:user_id,_id:id},{$set:postJSON})
        
        
         return {status:"success",message:" Cart update Successfully",data:data}
     } catch (error) {
         return {status:"fail",data:error.toString()}
     }
}
