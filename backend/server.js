import express from "express"; // packaging

import authRoutes from "./routes/auth.route.js";  //routes
import movieRoutes from "./routes/movie.route.js"; //routes

import { ENV_VARS } from "./config/envVar.js"; //config port
import {connectDB} from "./config/db.js";  // config port


const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json()) //will allow us to parse req.body object important dont code this cant get {email, password, username}

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",movieRoutes);

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:" + PORT);
    connectDB();

});

