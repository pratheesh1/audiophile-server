import { config } from "@utils/config";
import { hashPassword } from "@utils/crypto";
import { generateToken, verifyToken } from "@utils/jwt";

import { IJwtUserPayload, User } from "./user.model";
import { createUser, getUserByEmail } from "./user.repository";
import { jwtPayloadSchema } from "./user.schema";

const INVALID_EMAIL_OR_PASSWORD = "Invalid email or password";

const createUserService = async (...args: Parameters<typeof createUser>): Promise<User> => {
  const passwordHash = await hashPassword(args[0].password);
  const client = await createUser({ ...args[0], password: passwordHash });
  const newUser = new User(client);

  newUser
    .genVerifyEmailToken()
    .then(() => {
      newUser.sendVerifyEmail();
    })
    .catch(err => {
      // TODO: Add retry logic
      console.error(err);
    });

  await newUser.genRefreshToken();
  await newUser.genAccessToken();

  return newUser;
};

const loginUserService = async (email: string, password: string): Promise<User> => {
  const client = await getUserByEmail(email);
  if (!client) throw new Error(INVALID_EMAIL_OR_PASSWORD);

  const user = new User(client);
  const isValid = await user.validatePassword(password);
  if (!isValid) throw new Error(INVALID_EMAIL_OR_PASSWORD);

  try {
    verifyToken(user.token as string, config.JWT_REFRESH_TOKEN);
  } catch (err) {
    await user.genRefreshToken();
  }
  await user.genAccessToken();

  return user;
};

const logoutUserService = async (email: string): Promise<void> => {
  const client = await getUserByEmail(email);
  if (!client) throw new Error(INVALID_EMAIL_OR_PASSWORD);

  const user = new User(client);
  await user.logOut();
};

const refreshAccessTokenService = async (refreshToken: string): Promise<string | undefined> => {
  const payload = verifyToken(refreshToken, config.JWT_REFRESH_TOKEN);
  const { email, name } = (await jwtPayloadSchema.parseAsync(payload)) as IJwtUserPayload;
  // eslint-disable-next-line sonarjs/prefer-immediate-return
  const newAccessToken = generateToken({ name, email }, config.JWT_ACCESS_TOKEN, {
    expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });

  // TODO: Add logic to initiate security check and email notification
  return newAccessToken;
};

const userServices = {
  createUser: createUserService,
  loginUser: loginUserService,
  logoutUser: logoutUserService,
  refreshAccessToken: refreshAccessTokenService,
};

export default userServices;
