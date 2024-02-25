import { Resend } from 'resend';
import { type NextRequest } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json()


  try {
    const data = await resend.emails.send(body);

    console.log(data)
    return Response.json(data);
  } catch (error) {
    console.log(error)
    return Response.json({ error });
  }
}