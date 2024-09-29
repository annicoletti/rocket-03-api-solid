import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/user-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

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
            throw new UserAlreadyExistsError();
        }

        await this.userRepository.create({
            nome,
            email,
            password_hash
        });
    }
}

