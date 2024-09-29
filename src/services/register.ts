import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UsersRepository } from "../repositories/user-repository";
import { User } from "@prisma/client";

interface RegisterServiceRequest {
    nome: string,
    email: string,
    password: string
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {

    constructor(private userRepository: UsersRepository) { }

    execute = async ({ nome, email, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> => {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.userRepository.create({
            nome,
            email,
            password_hash
        });

        return { user }
    }
}

