import { Body, Controller, Delete, Get, HttpStatus, Logger, NotFoundException, Post, Put, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMyDocumentDTO } from './dto/myDocument.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/create')
  async addCustomer(@Res() res, @Body() CreateAboutDTO: CreateMyDocumentDTO) {
    Logger.log(`Creating new document`, 'AppController');
    const lists = await this.appService.create(CreateAboutDTO);
    return res.status(HttpStatus.OK).json({
      message: "Post has been created successfully",
      lists
    })
  }

  @Get('all')
  async findAll(@Res() res) {
    Logger.log(`Getting all documents`, 'AppController');
    const lists = await this.appService.findAll();
    return res.status(HttpStatus.OK).json(lists);
  }

  @Get('id')
  async findById(@Res() res, @Query('id') id: string) {
    Logger.log(`Getting document by id`, 'AppController');
    const lists = await this.appService.findById(id);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(lists);
  }

  @Put('/update')
  async update(@Res() res, @Query('id') id: string, @Body() CreateAboutDTO: CreateMyDocumentDTO) {
    Logger.log(`Updating document`, 'AppController');
    const lists = await this.appService.update(id, CreateAboutDTO);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      lists
    });
  }

  @Delete('/delete')
  async delete(@Res() res, @Query('id') id: string) {
    Logger.log(`Deleting document by id`, 'AppController');
    const lists = await this.appService.delete(id);
    if (!lists) throw new NotFoundException('Post does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      lists
    })
  }


  @Get('/getTxt')
  async getTxt(@Res() res) {
    var text = 'Hello world!';
    res.attachment('filename.txt');
    res.type('txt');
    res.send(text);
  }
}

