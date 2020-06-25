import { Test, TestingModule } from '@nestjs/testing';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { navigation } from "../mock/navigation";

describe('Navigation Controller', () => {
  let navigationCntroller: NavigationController;
  let navigationServise: NavigationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavigationController],
      providers: [NavigationService]
    }).compile();

    navigationCntroller = module.get<NavigationController>(NavigationController);
    navigationServise = module.get<NavigationService>(NavigationService);
  });

  it('should be defined', () => {
    expect(navigationCntroller).toBeDefined();
  });

  it('should return an array of navigation', async () => {
    jest.spyOn(navigationServise, 'findAll').mockImplementation(() => navigation);
    expect(navigationCntroller.findAll()).toBe(navigation);
  });

  it('should return navigation', async () => {
    const result = {
      id: 1,
      name: 'Курсы',
      url: '/course',
      icon: 'course',
    }
    jest.spyOn(navigationServise, 'findById').mockImplementation(() => result);
    expect(navigationCntroller.findById(1)).toBe(result);
  });
});
