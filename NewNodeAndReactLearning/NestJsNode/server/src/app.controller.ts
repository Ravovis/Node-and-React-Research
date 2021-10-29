import { Body, Controller, Delete, Get, HttpStatus, Logger, NotFoundException, Post, Put, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMyDocumentDTO } from './dto/myDocument.dto';
import * as PDFDocument from 'pdfkit'

const fs = require('fs')
var json2csv = require('json2csv');

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

  @Get('/readFromTxt')
  async readFromTxt(@Res() res) {
    fs.readFile('Resources\\test.txt', 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      res.send(data);
    })
  }

  @Get('/getPdf')
  async getPDF(@Res() res): Promise<void> {
    const buffer = await this.generatePDF()

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }

  async generatePDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      })

      // customize your PDF document
      doc.text('hello world', 100, 50)
      doc.addPage();
      doc.text('New Page', 100, 50)
      doc.end()

      const buffer = []
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      })
    })

    return pdfBuffer
  }

  @Get('/getCsv')
  async getCsv(@Res() res) {
    const myCars = [
      {
        "car": "Audi",
        "price": 40000,
        "color": "blue"
      }, {
        "car": "BMW",
        "price": 35000,
        "color": "black"
      }, {
        "car": "Porsche",
        "price": 60000,
        "color": "green"
      }
    ];


    var fields = ['car', 'price', 'color'];
    var fieldNames = ['Car', 'Price', 'Color'];
    var data = await  json2csv.parse( myCars, fields);

    res.attachment('filename.csv');
    res.status(200).send(data);
  }
}

