import { FastifyRequest, FastifyReply } from "fastify"

export async function refresh(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify({ onlyCookie: true })

    const { role } = request.user

    const token = await reply.jwtSign(
        {
            role
        },
        {
            sign: {
                sub: request.user.sub,
            }
        })


    const refreshToken = await reply.jwtSign(
        {
            role
        },
        {
            sign: {
                sub: request.user.sub,
                expiresIn: '7d',//expira em 7 dias
            }
        })

    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/', //todo o backend pode
            secure: true, //HTTPS usado, logo o front não consegue ler direito
            sameSite: true, //cookie só é visivel no site
            httpOnly: true, // só o backend pode acessar
        })
        .status(200)
        .send({
            token
        })



}