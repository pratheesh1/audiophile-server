/* eslint-disable security/detect-non-literal-fs-filename */
import { isDevEnv } from "@utils/config";
import { closeSync, existsSync, mkdirSync, openSync, utimesSync, writeSync } from "fs";

type ICallbackFn = () => void;

export const createDir = (dir: string, callback?: ICallbackFn): void => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  isDevEnv && console.log(`Initialized directory: ${dir}`);
  callback && callback();
};

export const createFile = (file: string, callback?: ICallbackFn): void => {
  const time = new Date();
  try {
    utimesSync(file, time, time);
  } catch (e) {
    const message = `This log file was created at ${time}\n${"=".repeat(100)}\n`;
    const fd = openSync(file, "a");
    writeSync(fd, message);
    closeSync(fd);
  }
  isDevEnv && console.log(`Initialized file: ${file}`);
  callback && callback();
};
