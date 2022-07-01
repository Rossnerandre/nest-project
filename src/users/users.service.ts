import { PrismaService } from '../modules/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async create({
    name,
    email,
    createdAt,
    password,
    updatedAt,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = await this.user({ email });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(password, 10);

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        createdAt: createdAt || new Date(),
        updatedAt: updatedAt || new Date(),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail({ email }: Prisma.UserWhereInput): Promise<User> {
    console.log(email);
    return this.prisma.user.findFirst({ where: { email } });
  }
}
