import dotenv from "dotenv";
import { Server } from "./models/server";
import { UserData } from "./interfaces/user";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number | string;
      DOMAIN: string;
      MONGO_CONNECTION: string;
    }
  }
  namespace Express {
    interface Request {
      user?: UserData;
    }
  }
}
dotenv.config({ debug: true, path: "./config.env" });

const server = new Server();

server.listen();
