import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as Joi from 'joi';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  public async signUp(data: Prisma.UserCreateInput): Promise<User> {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(4).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .max(32)
        .pattern(
          new RegExp('/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/'),
        )
        .required(),
    });
    schema.validate(data);
    return this.prisma.user.create({
      data,
    });
  }
}
