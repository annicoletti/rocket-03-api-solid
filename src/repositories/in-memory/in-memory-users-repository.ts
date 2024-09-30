import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../user-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UsersRepository {

    public items: User[] = [];

    async findById(id: String) {
        const user = this.items.find(item => item.id === id);
        if (!user) {
            return null;
        }
        return user;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {

        const user = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

        this.items.push(user);

        return user;
    }


    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email);

        if (!user) {
            return null;
        }

        return user;
    }
}