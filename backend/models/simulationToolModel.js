import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const simulationToolSchema = new Schema({
    name: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true,
        enum: resourceTypes
    },
    link: {
        type: Types.String,
        required: true
    }
})

let SimulationTool;
try {
    SimulationTool = mongoose.model('SimulationTool');
} catch (err) {
    SimulationTool = mongoose.model('SimulationTool', simulationToolSchema, 'simulation_tools');
}

export default SimulationTool;