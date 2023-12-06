import Patents from "@backend/models/patentModel"
import connectDB from "../index"
// import Paper from "../models/articlePaperModel"

import { data } from "@data/patents"

export const addData = async () => {
    try {
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                type: "Patent",
                authors: item["Organization / Authors"].trim().split(","),
                link: item["Link"]
            }
        })
        await Patents.insertMany(insertData)
    } catch (error) {
        throw error
    }
}