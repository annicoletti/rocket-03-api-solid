import { CheckIn, Prisma, User } from "@prisma/client";
import { CheckInRepository } from "../checkin-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepository implements CheckInRepository {

    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {

        const checkin = {
            id: randomUUID(),
            user_id: data.user_id,
            gyn_id: data.gyn_id,
            validated_at: data.validated_at? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkin);

        return checkin;
    }


}