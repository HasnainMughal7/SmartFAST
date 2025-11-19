import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/db.js'
import auth from './routes/auth.route.js'
import query from './routes/query.route.js'
import dashboard from './routes/dashboard.route.js'
import message from "./routes/mesage.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 7777;


//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth", auth);
app.use("/api/query", query);
app.use("/api/dashboard", dashboard);
app.use("/api/message", message);


app.get('/', (Request, Response) => {
  Response.send('Server is running');
})


app.listen(PORT, async() => {
  console.log("Server started on port",PORT);
  await connectDB();
})