
import { PasswordResetForm } from "@/app/(auth)/password-reset-confirm/[...params]/page";
import { PasswordResetEmailForm } from "@/app/(auth)/password-reset/page";
import { ServerKnownError } from "@/errors/errors";
import { parseURL } from "@/utils/parseURL";
import { z } from 'Zod';

export const serverResponsePasswordResetSchema = z.object({
  detail: z.string(),
});

export type ServerResponsePasswordReset = z.infer<typeof serverResponsePasswordResetSchema>;

const ServerErrorSchema = z.record(z.array(z.string()));

export type ServerError = z.infer<typeof ServerErrorSchema>;

export default async function passwordReset(data: PasswordResetForm, uid: string, token: string): Promise<ServerResponsePasswordReset> {
  try {
    const response = await fetch(parseURL('/api/auth/password/reset/confirm/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          uid: uid,
          token: token,
          new_password1: data.new_password1,
          new_password2: data.new_password2
        }
      )
    });

    console.log("response: ", response);
    const res = await response.json();
    const serverResponse = serverResponsePasswordResetSchema.safeParse(res);

    if (serverResponse.success) {
      console.log("Password reset changed succesfully! \n details: ", serverResponse.data);
      return serverResponse.data;
    }

    // If the server response wasn't a successful response, we validate the error to see if it's a known error
    const serverError = ServerErrorSchema.safeParse(data);

    if (serverError.success) {
      console.error("Server responded with known error: ", serverError.data);
      throw new ServerKnownError("", serverError.data);
    }

    throw new Error('Unexpected server response during registration');
  } catch (error) {
    throw error;
  }
}