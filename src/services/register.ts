import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/user-repository";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
    nome: string,
    email: string,
    password: string
}

export class RegisterService {

    constructor(private userRepository: UsersRepository) { }

    execute = async ({ nome, email, password }: RegisterServiceRequest) => {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error('E-mail already exists.');
        }

        await this.userRepository.create({
            nome,
            email,
            password_hash
        });
    }
}

