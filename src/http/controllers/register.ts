import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.body)

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { email, name, password } = registerBodySchema.parse(request.body)
    console.log('Passed validation')

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) return reply.status(409).send()

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })

    return reply.status(201).send()
  } catch (error) {
    console.error('Validation error:', error)
    return reply.status(400).send({ error: error.errors })
  }
}
