import { describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository';
import { AuthenticateService } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';


describe('Authenticate Use Case', () => {

    it('should to be able to authenticate', async () => {
        const userRepository = new InMemoryUserRepository();
        //pattern - system under test
        const sut = new AuthenticateService(userRepository);

        await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should not to be able to authenticate with wrong email', async () => {
        const userRepository = new InMemoryUserRepository();
        //pattern - system under test
        const sut = new AuthenticateService(userRepository);

        await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() =>
            sut.execute({
                email: 'joh@example.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });


    it('should not to be able to authenticate with wrong password', async () => {
        const userRepository = new InMemoryUserRepository();
        //pattern - system under test
        const sut = new AuthenticateService(userRepository);

        await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() =>
            sut.execute({
                email: 'joh@example.com',
                password: '1234567'
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});