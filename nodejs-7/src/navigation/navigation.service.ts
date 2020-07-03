import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Navigation } from './model/navigation.model';
import { UserNavigationService } from '../user-navigation/user-navigation.service';
import { User } from '../user/model/user.model';

@Injectable()
export class NavigationService {
  constructor(
    @InjectModel(Navigation)
    private navigationModel: typeof Navigation,
    private readonly userNavigationService: UserNavigationService,
  ) {}

  async findAll(): Promise<Navigation[]> {
    return await this.navigationModel.findAll();
  }
  async findById(navigationId: number): Promise<Navigation> {
    return await this.navigationModel.findOne({
      where: {
        id: navigationId,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
  }

  async createNavigation(navigation: Navigation): Promise<Navigation> {
    const navigationObject = new Navigation({
      name: navigation.name,
      url: navigation.url,
      icon: navigation.icon,
      users: navigation.users,
    });
    const saveNavigation = await navigationObject.save();
    await this.createUserNavigation(navigation.users, saveNavigation.id);
    return saveNavigation;
  }

  async removeNavigation(id: number): Promise<{ id: number }> {
    const navigation = await this.navigationModel.findOne({ where: { id } });
    const message = { id: navigation.id };
    await this.userNavigationService.removeNavigationServiceByNavigation(
      navigation.id,
    );
    navigation.destroy();
    return message;
  }

  async updateNavigation(navigation: Navigation): Promise<{ id: number }> {
    const navigationObject = await this.navigationModel.findOne({
      where: { id: navigation.id },
    });
    navigation.name && (navigationObject.name = navigation.name);
    navigation.url && (navigationObject.url = navigation.url);
    navigation.icon && (navigationObject.icon = navigation.icon);
    navigationObject.save();
    if (navigation?.users?.length) {
      await this.userNavigationService.removeNavigationServiceByNavigation(
        navigation.id,
      );
      await this.createUserNavigation(navigation.users, navigation.id);
    }
    return { id: navigation.id };
  }

  private async createUserNavigation(
    userArray: User[],
    navigationId: number,
  ): Promise<void> {
    await this.userNavigationService.bulkCreate(
      userArray.map(({ id }) => ({
        userId: id,
        navigationId,
      })),
    );
  }
}
