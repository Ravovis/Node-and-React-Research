import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const MyDocumentSchema = new mongoose.Schema({
text: String
});