import mongoose from 'mongoose';

export interface ISnippet extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    text: string;
    summary: string;
}

const snippetSchema = new mongoose.Schema<ISnippet>(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        summary: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

const Snippet = mongoose.model<ISnippet>('Snippet', snippetSchema);

export default Snippet;
