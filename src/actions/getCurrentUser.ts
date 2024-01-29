import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from '@/app/libs/prismadb'
import { getSession } from "next-auth/react"

export default async function getCurrentUser() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error) {
    return null
  }
}
