import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NavigationModule } from './navigation/navigation.module';

@Module({
  imports: [NavigationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
