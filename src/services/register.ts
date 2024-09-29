import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
    nome: string,
    email: string,
    password: string
}

export class RegisterService {

    constructor(private userRepository: any) { }

    execute = async ({ nome, email, password }: RegisterServiceRequest) => {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

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

