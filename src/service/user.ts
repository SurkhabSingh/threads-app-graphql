import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "crypto";
import JWT from "jsonwebtoken";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
export interface getUserTokenPayload {
  email: string;
  password: string;
}

const JWT_SECRET = "baTMan";

class UserService {
  private static generateHashedPassword(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  private static async getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static async getUserToken(payload: getUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);
    if (!user) throw new Error("user not found");
    const userSalt = user.salt;
    const userHashedPassword = UserService.generateHashedPassword(
      userSalt,
      password
    );

    if (userHashedPassword !== user.password)
      throw new Error("password is incorrect");

    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex");

    const hashedPassword = UserService.generateHashedPassword(salt, password);
    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  public static decodeJWT(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}
export default UserService;
