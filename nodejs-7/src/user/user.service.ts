import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UserNavigationService } from '../user-navigation/user-navigation.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly userNavigationService: UserNavigationService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll({ raw: true, nest: true });
    users.forEach(user => {
      delete user.password;
    });
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
      raw: true,
      nest: true,
    });
    delete user.password;
    return user;
  }

  async findByName(name: string): Promise<User> {
    return await this.userModel.findOne({
      where: { name },
      raw: true,
      nest: true,
    });
  }

  async createUser(user: User): Promise<{ id: number }> {
    const userObject = new User({
      name: user.name,
      age: user.age,
      password: user.password,
    });
    const saveUser = await userObject.save();
    return { id: saveUser.id };
  }

  async removeUser(id: number): Promise<{ id: number }> {
    const user = await this.userModel.findOne({ where: { id } });
    const message = { id: user.id };
    await this.userNavigationService.removeNavigationServiceByUser(user.id);
    await user.destroy();
    return message;
  }

  async updateUser(user: User): Promise<{ id: number }> {
    const userObject = await this.userModel.findOne({ where: { id: user.id } });
    user.name && (userObject.name = user.name);
    user.age && (userObject.age = user.age);
    user.password &&
      (userObject.password = await bcrypt.hash(user.password, 10));
    await userObject.save();
    return { id: userObject.id };
  }
}
