import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m', // 10 minutes
    },
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(405).send({ message: "Validation error.", issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // printar esse erro em algum lugar sem o usuario saber
    }

    return reply.status(500).send({ message: "Internal Server Error" })
})