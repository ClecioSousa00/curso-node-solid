import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let checkInsUseCase: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    checkInsUseCase = new CheckInUseCase(checkInsRepository)
  })
  it('should be able to check in', async () => {
    const { checkIn } = await checkInsUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
