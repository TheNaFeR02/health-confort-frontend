import { RegisterForm } from "@/app/(auth)/signup/page";
import { parseURL } from "../utils/parseURL";
import { z } from 'Zod';
import { ServerKnownError } from "@/errors/errors";

export const serverResponseSchema = z.object({
  detail: z.string(),
});

export type ServerResponse = z.infer<typeof serverResponseSchema>;

const ServerErrorSchema = z.record(z.array(z.string()));

export type ServerError = z.infer<typeof ServerErrorSchema>;

export async function registerUser(credentials: RegisterForm): Promise<ServerResponse> {
  try {
    const res = await fetch(parseURL("/api/auth/register/"), { 
      method: 'POST',
      body: JSON.stringify({
        username: credentials.username,
        email: credentials.email,
        password1: credentials.password,
        password2: credentials.confirmPassword
      }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json(); 

    // Try to parse the server response as a successful response
    const serverResponse = serverResponseSchema.safeParse(data);

    if (serverResponse.success) {
      console.log("User registered successfully. \n details: ", serverResponse.data);
      return serverResponse.data;
    }

    // If the server response wasn't a successful response, we validate the error to see if it's a known error
    // Ex: username already exists, email already exists, etc.
    const serverError = ServerErrorSchema.safeParse(data);

    if (serverError.success) {
      console.error("Server responded with known error: ", serverError.data);
      throw new ServerKnownError("", serverError.data);
    }

    throw new Error('Unexpected server response during registration');
  } catch (error) {
    // If error is thrown in res or JSON parsing, it's an unknown/generic error
    // If error is thrown in the server response validation, it's a known error
    throw error
  }
  
}