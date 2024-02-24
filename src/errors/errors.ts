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