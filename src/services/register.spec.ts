import { describe, it } from 'vitest';
import { RegisterService } from './register';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { compare } from 'bcryptjs';



describe('Resgister Use Case', () => {

    it('should hash user passord upon registration', async () => {
        const registerService = new RegisterService(new PrismaUsersRepository());

        const { user } = await registerService.execute({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        console.log(user.password_hash);

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);
    })
})