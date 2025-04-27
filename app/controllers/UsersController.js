import {
  LoginService,
  VerifyLoginService,
  CreateProfileService,
  UpdateProfileService,
  ReadProfileService,
} from "../service/UserServices.js";
import { CreateReviewService } from "../service/ProductReview.js";

export const Login = async (req, res) => {
  let result = await LoginService(req);
  return res.json(result);
};

export const VerifyLogin = async (req, res) => {
  let result = await VerifyLoginService(req);

  if (result["status"] === "success") {
    // Cookies Option
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    };

    // Set Cookies With Response
    res.cookie("token", result["token"], cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};

export const CreateUserProfile = async (req, res) => {
  let result = await CreateProfileService(req);
  return res.json(result);
};

export const UpdateUserProfile = async (req, res) => {
  let result = await UpdateProfileService(req);
  return res.json(result);
};

export const ReadUserProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.json(result);
};

// review

export const CreateUserReview = async (req, res) => {
  let result = await CreateReviewService(req);
  return res.json(result);
};

export const UpdateUserReview = async (req, res) => {
  let result = await CreateReviewService(req);
  return res.json(result);
};

export const UserLogout = async (req, res) => {
  let cookieOption = {
    expires: new Date(Date.now() + 24 * 6060 * 1000),
    httpOnly: false,
  };

  // Set Cookies With Response
  res.cookie("tokenrrr", "000", cookieOption);
  console.log(req.cookies);

  return res.status(200).json({ status: "success" });
};
