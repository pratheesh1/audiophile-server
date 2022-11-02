import {
  Address,
  Cart,
  EmailValidationToken,
  Order,
  Product,
  User as UserType,
  Voucher,
} from "@prisma/client";
import { config } from "@utils/config";
import { comparePassword } from "@utils/crypto";
import { generateToken, verifyToken } from "@utils/jwt";

import { createBlackListedToken, createBlackListedTokenByEmail } from "./blacklistToken.repository";
import { createEmailValidationToken } from "./emailValidator.repository";
import { addUserToken, resetUserToken } from "./user.repository";

export interface User extends Omit<UserType, "createdAt" | "updatedAt"> {
  emailToken?: EmailValidationToken;
  address?: Address;
  products?: Product[];
  carts?: Cart[];
  orders?: Order[];
  vouchers?: Voucher[];
}

export interface IJwtUserPayload {
  name: string;
  email: string;
}

export class User {
  private _accessToken?: string;
  private _refreshToken?: string;

  constructor(user: UserType) {
    Object.assign(this, user);
    this.middleName = user.middleName || "";
    if (user.token) this._refreshToken = user.token;
  }

  get fullName(): string {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }

  async validatePassword(password: string): Promise<boolean> {
    return await comparePassword(password, this.password);
  }

  async genVerifyEmailToken(): Promise<void> {
    const token = generateToken(
      { id: this.id, userName: this.fullName, email: this.email },
      config.JWT_EMAIL_TOKEN
    );
    await createEmailValidationToken(this.id, token);
  }

  async sendVerifyEmail(): Promise<void> {
    // TODO: Implement this
    console.log("[TODO] Send email to user to verify email");
  }

  async genAccessToken(): Promise<void> {
    const payload: IJwtUserPayload = { name: this.fullName, email: this.email };
    const token = generateToken(payload, config.JWT_ACCESS_TOKEN, {
      expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    this._accessToken = token;
  }

  async genRefreshToken(): Promise<void> {
    const payload: IJwtUserPayload = { name: this.fullName, email: this.email };
    const token = generateToken(payload, config.JWT_REFRESH_TOKEN, {
      expiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    addUserToken(this.id, token);
    this._refreshToken = token;
  }

  get accessToken(): string | undefined {
    return this._accessToken;
  }

  get refreshToken(): string | undefined {
    return this._refreshToken;
  }

  async resetToken(): Promise<void> {
    await resetUserToken(this.email);
  }

  async refreshAccessToken(): Promise<void> {
    if (!this._refreshToken) throw new Error("Unauthorized");
    verifyToken(this._refreshToken, config.JWT_REFRESH_TOKEN);
    await this.genAccessToken();
  }

  async logOut(): Promise<void> {
    if (this._refreshToken) {
      await createBlackListedToken({ userId: this.id, token: this._refreshToken });
    } else {
      await createBlackListedTokenByEmail(this.email);
    }
    await resetUserToken(this.email);
    this._accessToken = undefined;
    this._refreshToken = undefined;
  }
}
