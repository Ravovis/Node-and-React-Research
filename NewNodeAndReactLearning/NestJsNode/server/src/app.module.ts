import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyDocumentSchema } from './schemas/myDocument.schema';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TasksService } from './tasksService';

@Module({
  controllers: [AppController],
  providers: [AppService,TasksService],
  imports: [MongooseModule.forFeature([{ name: 'MyDocument', schema: MyDocumentSchema }]),
  MongooseModule.forRoot('mongodb://localhost:27017/MongoDbResearching'),
    UserModule,
    AuthModule,
  ScheduleModule.forRoot()]
})
export class AppModule { }
