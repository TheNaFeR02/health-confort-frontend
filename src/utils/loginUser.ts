import { parseURL } from "@/utils/parseURL"

export async function loginUser(credentials: Record<"username" | "password", string> | undefined): Promise<Record<"key", string> | null> {
  const res = await fetch(parseURL("/api/auth/login/"), {
    method: 'POST',
    body: JSON.stringify({
      username: credentials?.username,
      password: credentials?.password
    }),
    headers: { "Content-Type": "application/json" }
  });

  const serverResponse = await res.json(); // response gives the token

  if (res.ok) {
    const apiToken = serverResponse;
    console.log("User logged in succesfully. \n key: ",apiToken)
    return apiToken;
  } else {
    console.error('Failed to log in user. \n Message from server:', serverResponse);
    return null;
  }
}