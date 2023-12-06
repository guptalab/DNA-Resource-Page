import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const courseSchema = new Schema({

    title: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    authors: {
        type: [Types.String],
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }
})

let Course;
try {
    Course = mongoose.model('Course');
} catch (err) {
    Course = mongoose.model('Course', courseSchema, 'courses');
}

export default Course;