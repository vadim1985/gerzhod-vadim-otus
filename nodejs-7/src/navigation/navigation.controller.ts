import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { INavigation } from './interface';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  findAll(): INavigation[] {
    return this.navigationService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): INavigation {
    return this.navigationService.findById(id);
  }
}
