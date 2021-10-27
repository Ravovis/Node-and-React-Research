import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyDocumentSchema } from './schemas/myDocument.schema';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MongooseModule.forFeature([{ name: 'MyDocument', schema: MyDocumentSchema }]), MongooseModule.forRoot('mongodb://localhost:27017/MongoDbResearching')]
})
export class AppModule {}
