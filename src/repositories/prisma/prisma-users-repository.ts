import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { UsersRepository } from "../users-repository"

export class PrismaUsersRepository implements UsersRepository{
    async create({email, name, password_hash}:Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password_hash,
            },
        })

        return user
    }

    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        return user
    }
}