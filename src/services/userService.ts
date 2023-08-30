import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

class userService {
  public static async createUser(payload: CreateUserPayload) {
    try {
      const { firstName, lastName, email, password } = payload;
      console.log("payload ", payload);
      const salt = randomBytes(32).toString('hex');
      const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
      let data = await prismaClient.user.create({
        data: {
          firstName,
          lastName,
          email,
          salt,
          password: hashedPassword,
        },
      });
      console.log("data ", data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default userService;
