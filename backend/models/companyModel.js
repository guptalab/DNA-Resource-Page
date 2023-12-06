import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const companySchema = new Schema({
    organization: {
        type: Types.String,
        required: true
    },
    logoPath: {
        type: Types.String,
        required: true
    },
    description: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    }
})

let Company;
try {
    Company = mongoose.model('Company');
} catch (err) {
    Company = mongoose.model('Company', companySchema, 'companies');
}

export default Company;