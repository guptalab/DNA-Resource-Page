import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types

const eventSchema = new Schema({
    name: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    organizations: {
        type: [Types.String],
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }
})

let Event;
try {
    Event = mongoose.model('Event');
} catch (err) {
    Event = mongoose.model('Event', eventSchema,"events");
}

export default Event;