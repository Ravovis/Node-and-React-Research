import { Document } from 'mongoose';
export interface MyDocument extends Document {
readonly text: string;
readonly created_at: Date;
}