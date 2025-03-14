import { FetchUserCheckInsHisoryUseCase } from '../fetch-member-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHisoryUseCase(checkInsRepository)

  return useCase
}