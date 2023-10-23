import "dotenv/config"
import express from 'express';
import cors from 'cors';
import mailRoutes from "./routes/mailRoutes";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cors());

app.use('/ms-email', mailRoutes)

app.listen(process.env.PORT, () => console.log("Service Running on port " + process.env.PORT))