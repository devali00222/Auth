import dotenv from "dotenv";
import { Server } from "./models";
import { UserData } from "./interfaces";

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
dotenv.config({ debug: true });

const server = new Server();

server.listen();
