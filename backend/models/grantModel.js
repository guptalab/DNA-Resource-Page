import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const grantSchema = new Schema({
    organization: {
        type: Types.String,
        required: true
    },
    amountOfFund: {
        type: Types.String,
        default: 'NA'
    },
    link: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    startDate: {
        type: Types.Date,
        default: Date.now()
    },
    endDate: {
        type: Types.Date,
        default: Date.now()
    }

})

let Grant;
try {
    Grant = mongoose.model('Grant');
} catch (err) {
    Grant = mongoose.model('Grant', grantSchema, 'grants');
}

export default Grant;