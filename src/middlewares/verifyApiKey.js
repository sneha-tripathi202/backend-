import ApiError from "../utils/apiError.js";
import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})

const verifyApiKey=(req,res,next)=>{
    const apikey=req.header('api-key');
    if(!apikey){
        return next(new ApiError(401,"API key is missing"))
    }
    if(apikey!==process.env.API_KEY){
        return next(new ApiError(401,"Invalid API key"))
    }
    next()

}
export default verifyApiKey;