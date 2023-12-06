import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const bookSchema = new Schema({
    title: {
        type: Types.String,
        required: true
    },
    authors: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    link: {
        type: Types.String,
        required: true
    }
})

let Book;
try {
    Book = mongoose.model('Book');
} catch (err) {
    Book = mongoose.model('Book', bookSchema, "books");
}

export default Book;