import { Injectable } from '@nestjs/common';
import { navigation } from '../mock/navigation';
import { INavigation } from './interface';

@Injectable()
export class NavigationService {
  findAll(): INavigation[] {
    return navigation;
  }
  findById(navigationId: number): INavigation {
    return navigation.find(({ id }) => id === navigationId);
  }
}
