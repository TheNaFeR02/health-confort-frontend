
import { ServerKnownError } from '@/errors/errors';
import { ServerError, serverErrorSchema } from '@/types/serverError';
import { parseURL } from '@/utils/parseURL';
import { z } from 'Zod';

const successResponseSchema = z.object({
  key: z.string(),
});

export type SuccessResponse = z.infer<typeof successResponseSchema>;

export async function signinGoogle(id_token: string): Promise<SuccessResponse> {
  console.log("id_token", id_token)
  try {
    const res = await fetch(parseURL("/api/auth/google/"), {
      method: 'POST',
      body: JSON.stringify({
        "access_token": id_token
      }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    const serverResponse = successResponseSchema.safeParse(data);

    if (serverResponse.success) {
      console.error("Successful google signin. ", serverResponse.data);
      return serverResponse.data;
    }

    const serverError = serverErrorSchema.safeParse(data);

    if(serverError.success) {
      console.error("Server responded with known error: ", serverError.data);
      throw new ServerKnownError("", serverError.data);
    }

    throw new Error('Unexpected server response during registration');
  } catch (error) {
    throw error
  }
}