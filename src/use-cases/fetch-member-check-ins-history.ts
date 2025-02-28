import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHisoryUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckInsHisoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHisoryUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({ userId, page }: FetchUserCheckInsHisoryUseCaseRequest): Promise<FetchUserCheckInsHisoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUSerId(userId, page)

        return {
            checkIns,
        }
    }
}