import { Types } from 'mongoose';

export interface Snippet {
    _id?: Types.ObjectId;
    text: string;
    summary?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
