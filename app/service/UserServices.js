import SendEmail from "../utility/emailUtility.js";

import ProfileModel from "../model/profilesModel.js";
import UserModel from "../model/usersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";

export const LoginService = async (req) => {
  try {
    let { email } = req.body;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailTo=email ;
    let EmailText = `Your code is= ${code}`;
    let EmailSubject = `PlainB E-commerce Website Email Verification Code `;
    await SendEmail(EmailTo, EmailText, EmailSubject)
    await UserModel.updateOne(
      { email: email },
      { otp: code },
      { upsert: true }
    );

    return { status: "success", message: "6 digit code send successfully" };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};



export const VerifyLoginService = async (req) => {
  try {
    let { email, otp } = req.body;
    let total = await UserModel.find({ email: email, otp: otp });

    if (total.length === 1) {
      let user_id = await UserModel.find({ email: email, otp: otp }).select(
        "_id"
      );
      let token = TokenEncode(email, user_id[0]["_id"].toString());

      await UserModel.updateOne(
        { email: email },
        { $set: { otp: "0" } }
      ).select("_id");


      return { status: "success", message: "Valid otp", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};






export const CreateProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "profile save Successfuily" };
  } catch (e) {
    return { status: "fail", message: "SameThing went wrong" };
  }
};








export const UpdateProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.user_id = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "profile save successfuily" };
  } catch (e) {
    return { status: "fail", message: "SameThing went wrong" };
  }
};

export const ReadProfileService = async(req) => {
  try {
    let user_id = req.headers.user_id;
    let data = await ProfileModel.findOne({ userID: user_id });
    return {
      status: "success",
      message: "profile save Successfuily",
      data: data,
    };
  } catch (error) {
    return { status: "fail", message: "SameThing went wrong" };
  }
};
