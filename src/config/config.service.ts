import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    const configFile = fs.readFileSync(filePath);
    this.envConfig = dotenv.parse(configFile);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
