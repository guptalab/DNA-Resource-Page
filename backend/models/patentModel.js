import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const patentSchema = new Schema({
    title: {
        type: Types.String,
        required: true
    },
    authors: {
        type: [Types.String],
        required: true
    },
    link: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        enum: resourceTypes,
        default: 'Patent'
    },
})

let Patents;
try {
    Patents = mongoose.model('Patent');
} catch (err) {
    Patents = mongoose.model('Patent', patentSchema, "patents");
}

export default Patents;