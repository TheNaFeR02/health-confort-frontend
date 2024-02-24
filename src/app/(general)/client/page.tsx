'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client')
    }
  })

  // if (session?.user.role !== "admin"
  //     && session?.user.role !== "manager") {
  //     return <h1 className="text-5xl">Access Denied</h1>
  // }

  if (!session?.user) return


  return (
    <>
      <h1><center><strong>This is a Client Component!</strong></center></h1>
      <hr />
      <h2>User Details</h2>
      <p>-------------</p>
      <p><strong>Role:</strong> {session?.user.role}</p>
      <p><strong>API Token:</strong>  {session?.user.key}</p>
      <p><strong>Email:</strong> {session?.user.email}</p>
    </>
  )
}