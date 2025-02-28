import { GymsRepository } from "@/repositories/gyms-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists"
import type { Gym } from "@prisma/client"

interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) {}

    async execute({ title, description, phone, longitude, latitude }: CreateGymUseCaseRequest):Promise<CreateGymUseCaseResponse> {
        
        const gym = await this.gymsRepository.create({
            title,
            latitude,
            longitude,
            description,
            phone
        })

        return {
            gym,
        }
    }
}