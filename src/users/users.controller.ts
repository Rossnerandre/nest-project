import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() data: CreateUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.usersService.create(data);
    return response.json(user);
  }

  @Get()
  async findAll(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const users = await this.usersService.findAll();
    return response.json(users);
  }

  @Get('/:email')
  async findByEmail(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const users = await this.usersService.findByEmail(request.params);
    return response.json(users);
  }
}
