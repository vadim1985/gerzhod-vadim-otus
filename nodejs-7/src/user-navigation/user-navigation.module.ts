import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserNavigation } from './model/userNavigation.model';
import { UserNavigationService } from './user-navigation.service';

@Module({
  imports: [SequelizeModule.forFeature([UserNavigation])],
  providers: [UserNavigationService],
  exports: [UserNavigationService],
})
export class UserNavigationModule {}
