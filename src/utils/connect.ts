import mongoose from "mongoose";
import config from "config";
import  Logger  from './logger'

async function connect() {
    const dbUrl = config.get<string>('dbUrl');
    try {
        await mongoose.connect(dbUrl);
        Logger.info("DB connected");
    } catch (error) {
        Logger.error(error);
        process.exit(1);
    }

}

export default connect;