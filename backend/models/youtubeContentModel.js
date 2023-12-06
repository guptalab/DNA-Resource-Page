import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const youtubeContentSchema = new Schema({
    title: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    channel: {
        type: Types.String,
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }
})

let YoutubeContent;
try {
    YoutubeContent = mongoose.model('YoutubeContent');
} catch (err) {
    YoutubeContent = mongoose.model('YoutubeContent', youtubeContentSchema, 'youtube_contents');
}

export default YoutubeContent;