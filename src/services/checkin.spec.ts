import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory-checkins-repository";
import { CheckInService } from "./checkin";

let repository: InMemoryCheckInRepository
let sut: CheckInService

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        repository = new InMemoryCheckInRepository();
        sut = new CheckInService(repository); //pattern - system under test
    })

    it('should to be able to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(checkIn.id).toEqual(expect.any(String));
    });

});