
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { User } from 'next-auth'
import { redirect } from 'next/navigation'

type Props = {
  user: User,
}

export default async function GoogleCallback({ user }: Props) {
  const session = await getServerSession(options)

  console.log("Google Callback", session)
  if (session?.user.error !== undefined && session?.user.error !== null) {
    redirect('/error')
  }

  redirect('/')

}