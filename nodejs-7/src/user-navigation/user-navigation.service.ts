import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserNavigation } from './model/userNavigation.model';

interface IUserNavigation {
  userId: number;
  navigationId: number;
}

@Injectable()
export class UserNavigationService {
  constructor(
    @InjectModel(UserNavigation)
    private navigationModel: typeof UserNavigation,
  ) {}

  async bulkCreate(userNavigation: IUserNavigation[]): Promise<void> {
    await this.navigationModel.bulkCreate(userNavigation);
  }

  async removeNavigationServiceByNavigation(
    navigationId: number,
  ): Promise<void> {
    await this.navigationModel.destroy({ where: { navigationId } });
  }

  async removeNavigationServiceByUser(userId: number): Promise<void> {
    await this.navigationModel.destroy({ where: { userId } });
  }
}
