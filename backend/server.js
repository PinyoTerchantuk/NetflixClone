import express from "express"; // packaging

import authRoutes from "./routes/auth.route.js";  //routes
import movieRoutes from "./routes/movie.route.js"; //routes
import tvRoutes from "./routes/tv.route.js";

import { ENV_VARS } from "./config/envVar.js"; //config port
import {connectDB} from "./config/db.js";  // config port
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";


const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json()) //will allow us to parse req.body object important dont code this cant get {email, password, username}
app.use(cookieParser()); //"cookie-parser": "^1.4.7" pass cookie from request to use middleware protect route that must authen first*/


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes); // if authen axamine by protectRoute(MIddleWare) and then go next to fetch mvRoutesได้
app.use("/api/v1/tv",protectRoute, tvRoutes);

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:" + PORT);
    connectDB();

});

