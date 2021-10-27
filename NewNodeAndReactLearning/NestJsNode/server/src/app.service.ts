import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMyDocumentDTO } from './dto/myDocument.dto';
import { MyDocument } from './interfaces/myDocument.interface';

import { Model } from 'mongoose';


@Injectable()
export class AppService {
  constructor(@InjectModel('MyDocument') private MyDocumentModel: Model<MyDocument>) { }


  async create(CreateMyDocumentDTO: CreateMyDocumentDTO): Promise<any> {
    const createdCat = new this.MyDocumentModel(CreateMyDocumentDTO);
    return createdCat.save();
  }

  async findAll(): Promise<any> {
    return await this.MyDocumentModel.find().exec();
  }

  async findById(id): Promise<MyDocument> {
    const customer = await this.MyDocumentModel.findById(id).exec();
    return customer;
  }

  async find(req): Promise<any> {
    return await this.MyDocumentModel.find(req).exec();
  }

  async update(id, CreateMyDocumentDTO: CreateMyDocumentDTO): Promise<any> {
    return await this.MyDocumentModel.findByIdAndUpdate(id, CreateMyDocumentDTO, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.MyDocumentModel.findByIdAndRemove(id);
  }
}

