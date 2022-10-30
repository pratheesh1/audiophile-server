import { signedCookies } from "cookie-parser";
import { Session } from "express-session";

// declare module to export md notes for storybook
declare module "*.md";
declare module "*.mdx";

// declare additional types for session
declare global {
  namespace Express {
    interface Request {
      session: Session & {
        user?: string;
        redirectUrl?: string;
      };
      ReqBody: {
        user?: string;
        cookies?: { [key: string]: string };
        signedCookies?: ReturnType<typeof signedCookies>;
        redirectUrl?: string;
      };
    }
  }
}
