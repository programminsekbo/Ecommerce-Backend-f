import ReviewModel from "../model/reviewsModel.js";

export const CreateReviewService = async req => {
  try {
    let user_id = req.headers["user_id"];
    let { productID, des, rating } = req.body;
    let postJSON = {
      userID: user_id,
      productID: productID,
      des: des,
      rating: rating,
    };

    await ReviewModel.updateOne(postJSON, { $set: postJSON }, { upsert: true });

    return { status: "success", message: "create Successfully" };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
