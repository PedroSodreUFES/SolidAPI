import { GymsRepository } from "@/repositories/gyms-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists"
import type { Gym } from "@prisma/client"

interface SearchGymUseCaseRequest {
    query: string
    page: number
}

interface SearchGymUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymUseCase {
    constructor(private gymsRepository: GymsRepository) {}

    async execute({ query, page }: SearchGymUseCaseRequest):Promise<SearchGymUseCaseResponse> {
        const gyms = await this.gymsRepository.searchMany(query, page)
        
        return {
            gyms,
        }
    }
}