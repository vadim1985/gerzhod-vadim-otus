import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Body,
  UseGuards,
  Post,
} from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { Navigation } from './model/navigation.model';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  findAll(): Promise<Navigation[]> {
    return this.navigationService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Navigation> {
    return this.navigationService.findById(id);
  }

  @Put()
  createNavigation(@Body() navigation: Navigation): Promise<Navigation> {
    return this.navigationService.createNavigation(navigation);
  }

  @Post(':id')
  removeNavigation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number }> {
    return this.navigationService.removeNavigation(id);
  }

  @Post()
  updateNavigation(@Body() navigation: Navigation): Promise<{ id: number }> {
    return this.navigationService.updateNavigation(navigation);
  }
}
