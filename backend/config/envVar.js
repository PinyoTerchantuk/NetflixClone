import dotenv from "dotenv"; 

dotenv.config();

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI, // เก็บค่า URL สำหรับเชื่อมต่อ MongoDB
    PORT: process.env.PORT || 5000,  // ถ้าไม่มีค่า PORT ใน .env จะใช้ 5000 เป็นค่าเริ่มต้น
    JWT_SECRET: process.env.JWT_SECRET, // เก็บคีย์ลับสำหรับ JSON Web Token
    NODE_ENV: process.env.NODE_ENV ,
    TMDB_API_KEY: process.env.TMDB_API_KEY, 
//ENV_VARS UPPER ALL IS CONSTANT VALUE NOT CHANGED
};
//config environment like servers

// ENV_VARS is a global variable that is used to configure the all environment include MONGO_URI and port and JWT_SECRET variables  