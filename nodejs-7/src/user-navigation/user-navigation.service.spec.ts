import { Test, TestingModule } from '@nestjs/testing';
import { UserNavigationService } from './user-navigation.service';

describe('UserNavigationService', () => {
  let service: UserNavigationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserNavigationService],
    }).compile();

    service = module.get<UserNavigationService>(UserNavigationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
