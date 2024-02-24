import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { User } from 'next-auth'
import { redirect } from 'next/navigation'

type Props = {
  user: User,
}

export default async function Profile({ user }: Props) {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  return (
    <>
      <h1><center><strong>This is a Server Component!</strong></center></h1>
      <hr />
      <h2>User Details</h2>
      <p>-------------</p>
      <p><strong>Role:</strong> {session?.user.role}</p>
      <p><strong>API Token:</strong>  {session?.user.key}</p>
      <p><strong>Email:</strong> {session?.user.email}</p>
    </>
  )
}