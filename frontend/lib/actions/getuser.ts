"use server"
import { auth } from "@/auth"

export const getuser =  async () => {
    const session = await auth()
    if(!session) return null
    const user_id = session?.user?.id
    return Number(user_id)
}
