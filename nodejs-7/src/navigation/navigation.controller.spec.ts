import { Test, TestingModule } from '@nestjs/testing';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import * as SequelizeMock from 'sequelize-mock';
import { UserNavigationService } from '../user-navigation/user-navigation.service';
import { Navigation } from './model/navigation.model';

const DBConnectionMock = new SequelizeMock();
const result: Navigation = DBConnectionMock.define('Navigation', {
  id: 1,
  name: 'Курсы',
  url: '/course',
  icon: 'course',
});

describe('Navigation Controller', () => {
  let navigationCntroller: NavigationController;
  let navigationServise: NavigationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavigationController],
      providers: [NavigationService, UserNavigationService],
    }).compile();

    navigationCntroller = module.get<NavigationController>(
      NavigationController,
    );
    navigationServise = module.get<NavigationService>(NavigationService);
  });

  it('should be defined', () => {
    expect(navigationCntroller).toBeDefined();
  });

  it('should return an array of navigation', async () => {
    jest.spyOn(navigationServise, 'findAll').mockImplementation(() => {
      return new Promise(res => res([result]));
    });
    expect(await navigationCntroller.findAll()).toBe([result]);
  });

  it('should return navigation', async () => {
    jest
      .spyOn(navigationServise, 'findById')
      .mockImplementation(
        async (): Promise<Navigation> => Promise.resolve(result),
      );
    expect(await navigationCntroller.findById(1)).toBe(result);
  });
});
