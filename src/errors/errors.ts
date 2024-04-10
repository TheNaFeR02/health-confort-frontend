import {z} from 'Zod';

export class ServerKnownError extends Error {
  serverErrors?: { [key: string]: string[] } ;

  constructor(message?:string, serverMessage?: { [key: string]: string[] }) {
    super(message);
    this.name = 'ServerKnownError';
    this.serverErrors = serverMessage;
  }
}

export class ServerUnknownError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ServerUnknownError';
  }
}

// Example of a generic error response from the server
/* 
  {
    "first_name": [
        "This field may not be blank."
    ],
    "last_name": [
        "This field may not be blank."
    ]
  }
*/
export const genericErrorSchema = z.record(z.array(z.string()));

export type GenericError = z.infer<typeof genericErrorSchema>;

