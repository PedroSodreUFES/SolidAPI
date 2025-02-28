import { Gym, Prisma, User } from "@prisma/client";

export interface GymsRepository{
    findById(userId: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}