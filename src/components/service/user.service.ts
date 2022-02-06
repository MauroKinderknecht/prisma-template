import { Prisma, User } from '@prisma/client';

import prisma from '../../db';
import { NotFoundError } from '../../error';
import { exclude } from '../../utils';

class UserService {

    public static find = async (where: Prisma.UserWhereUniqueInput) => {
        const user = await prisma.user.findUnique({
            where,
        });
        if (!user) throw new NotFoundError('User not found');
        return exclude(user, 'password');
    }

    public static findByIdWithPostsAndProfile = async (id: User['id']) => {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { posts: true, profile: true }
        });
        if (!user) throw new NotFoundError('User not found');
        return exclude(user, 'password');
    }

    public static findAll = async (where?: Prisma.UserWhereInput) => {
        const users = await prisma.user.findMany({
            where,
        });
        return users.map(user => exclude(user, 'password'));
    }

    public static create = async (data: Prisma.UserCreateInput) => {
        const user = await prisma.user.create({
            data,
        });
        return exclude(user, 'password');
    }

    public static update = async (
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput
    ) => {
        const user = await prisma.user.update({
            where,
            data,
        });
        if (!user) throw new NotFoundError('User not found');
        return exclude(user, 'password');
    }

    public static delete = async (
        where: Prisma.UserWhereUniqueInput,
    ) => {
        const user = await prisma.user.delete({
            where,
        });
        if (!user) throw new NotFoundError('User not found');
        return user ? true : false;
    }

}

export default UserService;