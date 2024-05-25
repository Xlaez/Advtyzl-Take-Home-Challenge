import { config } from 'dotenv';

config({});

export class Environment {
  private env: string;

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
