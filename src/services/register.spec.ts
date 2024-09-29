import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterService } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let userRepository: InMemoryUserRepository
let sut: RegisterService

describe('Resgister Use Case', () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        sut = new RegisterService(userRepository); //pattern - system under test
    })

    it('should to be able to register', async () => {

        const { user } = await sut.execute({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should hash user passord upon registration', async () => {

        const { user } = await sut.execute({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        console.log(user.password_hash);

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {

        const email = 'johndoe@example.com';

        await sut.execute({
            nome: 'John Doe',
            email,
            password: '123456'
        });

        await expect(() =>
            sut.execute({
                nome: 'John Doe',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    });
})