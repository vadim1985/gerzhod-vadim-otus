import { Test, TestingModule } from '@nestjs/testing';
import { NavigationService } from './navigation.service';
import { INavigation } from './interface';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NavigationService],
    }).compile();

    service = module.get<NavigationService>(NavigationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array', () => {
    expect(Array.isArray(service.findAll())).toBeTruthy();
  });

  it('should contain id', () => {
    expect('id' in service.findById(1)).toBeTruthy();
  });

  it('should contain name', () => {
    expect('name' in service.findById(1)).toBeTruthy();
  });
});
