/* eslint-disable security/detect-non-literal-fs-filename */
import { isDevEnv } from "@utils/config";
import * as config from "@utils/config";
import fs from "fs";

import * as fsFunctions from "./fs";

describe("fs functions", () => {
  const mockCallbackFn = jest.fn();

  describe("createDir function", () => {
    it("should create directory if it does not exist", () => {
      const dir = "test";
      fsFunctions.createDir(dir);
      expect(fs.existsSync(dir)).toBe(true);
      fs.rmdirSync(dir);
    });

    it("should not create directory if it already exists", () => {
      const dir = "test";
      fs.mkdirSync(dir);
      fsFunctions.createDir(dir);
      expect(fs.existsSync(dir)).toBe(true);
      fs.rmdirSync(dir);
    });

    it("should call callback function if it is provided", () => {
      const dir = "test";
      fsFunctions.createDir(dir, mockCallbackFn);
      expect(mockCallbackFn).toHaveBeenCalled();
      fs.rmdirSync(dir);
    });

    it("should log message if in development environment", () => {
      const dir = "test";
      const consoleLogActual = console.log;
      console.log = jest.fn();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - testing config
      config.isDevEnv = true;

      fsFunctions.createDir(dir);
      expect(console.log).toHaveBeenCalled();
      fs.rmdirSync(dir);

      console.log = consoleLogActual;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - testing config
      config.isDevEnv = isDevEnv;
    });
  });

  describe("createFile function", () => {
    it("should create file if it does not exist", () => {
      const file = "test.txt";
      fsFunctions.createFile(file);
      expect(fs.existsSync(file)).toBe(true);
      fs.unlinkSync(file);
    });

    it("should not create file if it already exists", () => {
      const file = "test.txt";
      fs.writeFileSync(file, "");
      fsFunctions.createFile(file);
      expect(fs.existsSync(file)).toBe(true);
      fs.unlinkSync(file);
    });

    it("should call callback function if it is provided", () => {
      const file = "test.txt";
      fsFunctions.createFile(file, mockCallbackFn);
      expect(mockCallbackFn).toHaveBeenCalled();
      fs.unlinkSync(file);
    });

    it("should log message if in development environment", () => {
      const file = "test.txt";
      const isDevEnvActual = config.isDevEnv;
      const consoleLogActual = console.log;
      console.log = jest.fn();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - testing config
      config.isDevEnv = true;

      fsFunctions.createFile(file);
      expect(console.log).toHaveBeenCalled();
      fs.unlinkSync(file);

      console.log = consoleLogActual;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - testing config
      config.isDevEnv = isDevEnvActual;
    });
  });

  describe("countFiles function", () => {
    it("should return 0 if directory does not exist", () => {
      const dir = "test";
      const result = fsFunctions.countFiles(dir);
      expect(result).toBe(0);
    });

    it("should return 0 if directory is empty", () => {
      const dir = "test";
      fs.mkdirSync(dir);
      const result = fsFunctions.countFiles(dir);
      expect(result).toBe(0);
      fs.rmdirSync(dir);
    });

    it("should return number of files in directory", () => {
      const dir = "test";
      fs.mkdirSync(dir);
      fs.writeFileSync(`${dir}/test.txt`, "");
      fs.writeFileSync(`${dir}/test2.txt`, "");
      const result = fsFunctions.countFiles(dir);
      expect(result).toBe(2);
      fs.unlinkSync(`${dir}/test.txt`);
      fs.unlinkSync(`${dir}/test2.txt`);
      fs.rmdirSync(dir);
    });
  });
});
