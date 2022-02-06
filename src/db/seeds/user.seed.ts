import { Prisma } from "@prisma/client";
import prisma from '../../db/index';

const users: Prisma.UserCreateInput[] = [
    {
        email: 'user@test.com',
        password: 'password',
        phoneNumber:'+1112345678',
    },
    {
        email: 'user2@test.com',
        password: 'password',
        phoneNumber:'+111234569',
    },
]

const seedUsers = async () => {
    console.log('Seeding users...');
    users.map( data => {
        prisma.user.create({
            data,
        })
    })
    console.log('Finished seeding users.')
}

export default seedUsers;