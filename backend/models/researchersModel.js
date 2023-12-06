import mongoose from "mongoose";

// import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const researchersSchema = new Schema({
    name: {
        type: Types.String,
        default: "Manish K. Gupta"
    },
    
    link: {
        type: Types.String,
        default: "https://www.guptalab.org/mainweb/index.html"
    }
    
})

let Researcher;
try {
    Researcher = mongoose.model('Researcher');
} catch (err) {
    Researcher = mongoose.model('Researcher', researchersSchema, 'researcher');
}

export default Researcher;