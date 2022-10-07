import { app } from 'electron';
import path from 'path'
import * as fs from 'fs'


export default class Store {
  get(filename: string, directory: string) {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, directory, filename + '.json');
    return parseDataFile(filePath, {});
  }
  
  set(filename: string, directory: string, data: object) {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, directory, filename + '.json');
    console.log(filePath)
    fs.writeFileSync(filePath, JSON.stringify(data));
  }
}

function parseDataFile(filePath: string, defaults: object) {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch(error) {
    return defaults;
  }
}
