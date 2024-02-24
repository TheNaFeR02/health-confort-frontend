
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { User } from 'next-auth'
import { redirect } from 'next/navigation'

type Props = {
  user: User,
}

export default async function Error() {
  const session = await getServerSession(options)


  // if (!session) {
  //   redirect('/api/auth/signin?callbackUrl=/server')
  // }

  return (
    <div>
      <h1>Error</h1>
      <p>{JSON.stringify(session?.user.error)}</p>
    </div>     
  )
}
