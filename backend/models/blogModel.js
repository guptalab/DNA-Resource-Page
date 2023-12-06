import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const blogSchema = new Schema({
    title: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    organization: {
        type: Types.String,
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }
})

let Blog;
try {
    Blog = mongoose.model('Blog');
} catch (err) {
    Blog = mongoose.model('Blog', blogSchema,"blogs");
}

export default Blog;