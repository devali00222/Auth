import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { databaseConnection } from '../database/config';


const BlockClassJS = function(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
};


export class Server {
  private _app: Application;
  private _port: number;

  private apiRoutes: {
    userPath: string;
    websitePath: string;
    templatePath: string;
    tokenPath: string;
  };

  constructor() {
    this._app = express();

    this._port = parseInt(process.env.PORT as string, 10) || 8000;
    //Paths from rutes
    this.apiRoutes = {
      userPath: '/api/auth/user',
      websitePath: '/api/website',
      templatePath: '/api/template',
      tokenPath: '/api/token',
    };

    //Database Connection
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Rutes from App
    this.routes();
  }

  middlewares() {
    //Secure  Express
    this._app.use(helmet());

    //cors
    this._app.use(cors());

    //read json.body
    this._app.use(express.json());

    //Public
    this._app.use(express.static('public'));
  }

  async connectDB() {
    await databaseConnection();
  }
  //Rutes from App
  routes() {
    this._app.use(
      this.apiRoutes.userPath,
      require('../routes/user.api.routes')
    );
    // this._app.use(
    //   this.apiRoutes.websitePath,
    //   require('../routes/website.api.routes')
    // );
    // this._app.use(
    //   this.apiRoutes.templatePath,
    //   require('../routes/template.api.routes')
    // );

    // this._app.use(
    //   this.apiRoutes.tokenPath,
    //   require('../routes/token.api.routes')
    // );
  }

  listen() {
    this._app.listen(this._port, () => {
      console.log('Listen port: ' + this._port);
    });
  }
}
BlockClassJS(Server)