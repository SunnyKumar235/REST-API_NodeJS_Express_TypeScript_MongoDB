import express from "express";
import config from 'config';
import connect from "./utils/connect";
import  Logger  from "./utils/logger";
import routes from './routes';
import bodyParser from 'body-parser'
import deserializeUser from './middleware/deserializeUser';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(deserializeUser);


const port = config.get<number>('port');


app.listen(port, async()=>{
    Logger.info(`App is running on http://localhost:${port}`);
    await connect();  
    routes(app);
}) 