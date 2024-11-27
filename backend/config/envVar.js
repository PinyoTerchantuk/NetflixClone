import dotenv from "dotenv"; 

dotenv.config();

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
//ENV_VARS UPPER ALL IS CONSTANT VALUE NOT CHANGED
}