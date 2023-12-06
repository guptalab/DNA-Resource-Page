import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const softwareSchema = new Schema({
    title: {
        type: Types.String,
        required: true
    },
    description: {
        type: Types.String,
        required: true
    },
    link: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    }
})

let Software;
try {
    Software = mongoose.model('Software');
} catch (err) {
    Software = mongoose.model('Software', softwareSchema, 'softwares');
}

export default Software;