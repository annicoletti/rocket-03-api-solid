import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "../repositories/checkin-repository";

interface CheckInServiceRequest {
    userId: string,
    gymId: string,
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService {

    constructor(private checkInRepository: CheckInRepository) { }

    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {

        const checkIn = await this.checkInRepository.create({
            gyn_id: gymId,
            user_id: userId
        })

        return { checkIn };
    }

}