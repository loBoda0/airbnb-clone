import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function POST(
  request: Request
) {
  const body = await request.json()
  const { email, name, password } = body

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    })
    return NextResponse.json(user)
  } catch (error) {
    console.error(error) // Log the original error for debugging purposes
    return new Response("Error", { status: 400 }) 
  }
}