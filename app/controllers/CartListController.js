import { CreateCartService, ReadCartService, RemoveCartService, UpdateCartService } from "../service/CartListService.js";




export const CreateCart=async(req,res)=>{
    let result=await CreateCartService(req)
    return res.json(result);
}

export const ReadCartList=async(req,res)=>{
    let result=await ReadCartService(req)
    return res.json(result);
}

export const RemoveCart=async(req,res)=>{
    let result=await RemoveCartService(req)
    return res.json(result);
}


export const UpdateCart=async(req,res)=>{
    let result=await UpdateCartService(req)
    return res.json(result);
}
