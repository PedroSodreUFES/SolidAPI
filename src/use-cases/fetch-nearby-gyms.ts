import { GymsRepository } from "@/repositories/gyms-repository"
import type { Gym } from "@prisma/client"

interface FetchNearbyGymUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymUseCase {
    constructor(private gymsRepository: GymsRepository) {}

    async execute({ userLatitude, userLongitude }: FetchNearbyGymUseCaseRequest):Promise<FetchNearbyGymUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude:userLongitude,
        })
        
        return {
            gyms,
        }
    }
}