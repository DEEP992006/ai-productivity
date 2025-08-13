import { signOut } from '@/auth'
import { redirect } from 'next/dist/server/api-utils'
export const SignoutButton = () => {
  return (
      <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
        
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}

