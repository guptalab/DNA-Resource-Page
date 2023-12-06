import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME,
        }

        cached.promise = mongoose.connect(process.env.DB_URI, opts).then((mongoose) => {
            return mongoose
        }).catch((err) => {
            throw err
        })
    }
    cached.conn = await cached.promise
    console.log("DB Connected Successfully!");
    return cached.conn
}

export default connectDB