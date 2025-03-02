import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'
import { makeCreateGymCase } from "@/use-cases/factories/make-create-gym-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        title: z.string(),
        phone: z.string().nullable(),
        description: z.string().nullable(),
        latitude: z.number().refine(value => {
            return value <= 90 && value >= -90
        }),
        longitude: z.number().refine(value => {
            return value <= 180 && value >= -180
        })
    })

    const { description, latitude, longitude, phone, title } = createBodySchema.parse(request.body)

    const createGymUseCase = makeCreateGymCase()

    await createGymUseCase.execute({
        description,
        latitude,
        longitude,
        phone,
        title
    })
    
    return reply.status(201).send()
}