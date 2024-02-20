import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { z } from "zod"
import { createSchema } from 'ts-to-zod';


declare module "next-auth" {
  interface Session {

  }


  interface User extends DefaultUser, UserSchemaType {
    username: string;
    key: string;
    role: string;
  }


  // export const userSchema = createSchema<User>();
}
