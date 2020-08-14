import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Navigation } from './model/navigation.model';
import { UserNavigationModule } from '../user-navigation/user-navigation.module';

@Module({
  imports: [SequelizeModule.forFeature([Navigation]), UserNavigationModule],
  controllers: [NavigationController],
  providers: [NavigationService],
})
export class NavigationModule {}
