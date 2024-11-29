import Server from "./server/server.js";
import colors from "colors"
import dotenv from 'dotenv'
dotenv.config();

const serve = new Server()

serve.listen()