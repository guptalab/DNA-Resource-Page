import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const projectSchema = new Schema({
    title: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    fundingAgency: {
        type: Types.String,
        required: true
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

let Project;
try {
    Project = mongoose.model('Project');
} catch (err) {
    Project = mongoose.model('Project', projectSchema, 'projects');
}

export default Project;