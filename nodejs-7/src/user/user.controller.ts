import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Body,
  UseGuards,
  Post,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }

  @Put()
  async createUser(@Body() user: User): Promise<{ id: number }> {
    return await this.userService.createUser(user);
  }

  @Delete()
  async removeUser(
    @Body('id') id: number,
  ): Promise<{ id: number }> {
    return this.userService.removeUser(id);
  }

  @Post()
  async updateUser(@Body() user: User): Promise<{ id: number }> {
    if (!user.id) throw new BadRequestException('id not found');
    return this.userService.updateUser(user);
  }
}
