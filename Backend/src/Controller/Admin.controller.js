import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const AdminLogin = asyncHandler(async(req,res) => {

    const generateAccessAndRefreshtoken = async (userId) => {
        try {
          const user = await User.findById(userId);
          const accessToken = await user.generateAccessToken() ;
          await user.save({ validateBeforeSave: false });
      
          return { accessToken };
        } catch (error) {
          throw new ApiError(
            500,
            `something  went wrong while creating user ${error}`
          );
        }
      };

    const {email , password} = req.body ;


    if([email , password].some(field => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({
        $or: [{ email: email}]
    })

    if(user.isAdmin === true){

        const isPasswordValid = await user.isPasswordCorrect(password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
          throw new ApiError(401, "invalid user crendatials");
        }
        const { accessToken } = await generateAccessAndRefreshtoken(
          user._id
        );
      
        const loggedInUAdmin = await User.findById(user._id).select(
          "-password -refreshToken"
        );
    
        return res.json(new ApiResponse(200 , {accessToken , loggedInUAdmin} , "Admin Login success"))
    }

})