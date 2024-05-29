import { config } from 'dotenv';

config({});

export class Environment {
  private env: string;
  public dbName = process.env.DB_NAME;
  public dbHostName = process.env.DB_HOSTNAME;
  public dbUserName = process.env.DB_USERNAME;
  public dbPassword = process.env.DB_PASSWORD;
  public dbUrlDev = process.env.DB_INTERNAL_URL;
  public dbUrlProd = process.env.DB_EXTERNAL_URL;

  constructor() {
    this.env = process.env.NODE_ENV;
  }

  public dev() {
    return this.env === 'development' ? true : false;
  }

  public prod() {
    return this.env === 'production' ? true : false;
  }
}
