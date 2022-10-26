import express, { Express } from "express";

export async function createServer(): Promise<Express> {
  return express();
}
