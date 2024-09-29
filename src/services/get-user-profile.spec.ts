import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository';
import { GetUserProfileService } from './get-user-profile';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let userRepository: InMemoryUserRepository
let sut: GetUserProfileService

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        sut = new GetUserProfileService(userRepository); //pattern - system under test
    })

    it('should to be able to get user profile', async () => {

        const createdUser = await userRepository.create({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.id).toEqual(expect.any(String));
        expect(user.nome).toEqual('John Doe');
    });

    it('should not be able to get user profile with wrong id', async () => {

        await expect(() =>
            sut.execute({
                userId: 'non-existing-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

});