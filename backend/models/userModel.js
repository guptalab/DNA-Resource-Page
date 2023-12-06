import mongoose from "mongoose";

const Schema = mongoose.Schema
const Types = Schema.Types

const userSchema = new Schema({
    name: {
        type: Types.String,
        required: true
    },
    email: {
        type: Types.String,
        unique: true,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    role: {
        type: Types.String,
        enum: ["admin", "user"],
        default: "user",
    },
    /*
    * userStatus: defines the current status of the user for making updates to the database
    */
    userStatus: {
        type: Types.String,
        enum: ["pending", "rejected", "accepted", "none"],
        default: "none",
    }
})

const methods = {
    isAdmin: function () {
        return this.role === "admin"
    }
}

let User
try {
    User = mongoose.model("User")
    User.methods = methods
} catch (error) {
    User = mongoose.model("User", userSchema, "users")
    User.methods = methods
}

export default User