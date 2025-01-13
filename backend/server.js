import express from "express"; // packaging

import authRoutes from "./routes/auth.route.js";  //routes
import movieRoutes from "./routes/movie.route.js"; //routes
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVar.js"; //config port
import {connectDB} from "./config/db.js";  // config port
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";

import path from "path";


const app = express();
const PORT = ENV_VARS.PORT;

const __dirname = path.resolve();

app.use(express.json()) //will allow us to parse req.body object important dont code this cant get {email, password, username}
app.use(cookieParser()); //"cookie-parser": "^1.4.7" pass cookie from request to use middleware protect route that must authen first*/


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes); // if authen axamine by protectRoute(MIddleWare) and then go next to fetch mvRoutesได้
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use("/api/v1/search",protectRoute, searchRoutes);

if(ENV_VARS.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:" + PORT);
    connectDB();

});

