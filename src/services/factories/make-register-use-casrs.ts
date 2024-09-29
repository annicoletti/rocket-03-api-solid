import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register";

export const makeRegisterUseCase = () => {
    const userRepository = new PrismaUsersRepository;
    const registerService = new RegisterService(userRepository);

    return registerService;
}