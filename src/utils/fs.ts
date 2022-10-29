/* eslint-disable security/detect-non-literal-fs-filename */
import { isDevEnv } from "@utils/config";
import { closeSync, existsSync, mkdirSync, openSync, readdirSync, utimesSync } from "fs";

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
    const fd = openSync(file, "a");
    closeSync(fd);
  }
  isDevEnv && console.log(`Initialized file: ${file}`);
  callback && callback();
};

export const countFiles = (dir: string): number => {
  if (!existsSync(dir)) return 0;
  const files = readdirSync(dir);
  return files.length;
};
