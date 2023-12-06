import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const articlePaperSchema = new Schema({

    title: {
        type: Types.String,
        default: "title"
    },
    topics: {
        type: [Types.String],
        default: []
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    authors: {
        type: [Types.String],
        default: []
    },
    publishedDate: {
        type: Types.Date,
        default: Date.now()
    },
    source: {
        type: Types.String,
        default: "unknown"
    },
    link: {
        type: Types.String,
        default: ""
    }


})

let ArticlePaper;
try {
    ArticlePaper = mongoose.model('ArticlePaper');
} catch (err) {
    ArticlePaper = mongoose.model('ArticlePaper', articlePaperSchema, 'article_papers');
}

export default ArticlePaper;