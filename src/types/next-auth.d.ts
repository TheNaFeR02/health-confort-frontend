import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import { z } from "zod"
import { createSchema } from 'ts-to-zod';


declare module "next-auth" {
  interface Session {
    user: {
      role: string,
      key?: string | null,
      email?: string | null,
      error?: any,
    } & DefaultSession
  }


  interface User extends DefaultUser, UserSchemaType {
    username: string;
    key: string ;
    role: string;
  }

}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string,
    key: string | undefined, 
    id_provider?: string | null,
    // error?: string | null,
    error?: any,
  }
}
