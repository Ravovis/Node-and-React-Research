import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const WebSocket = require('ws');
const server = new WebSocket.Server({port:8080});
server.on('connection',socket=>{
  socket.on('message', message =>{
    socket.send(`Roger that! ${message}`);
  })
  setInterval(()=>{socket.send(`Server says his information`);},5000)
})


const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Swagger API Title")
    .setDescription("Swagger API description")
    .setVersion('1.0')
    .addTag("Swagger API Title")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  
  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
