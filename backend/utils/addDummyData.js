import Researcher from "@backend/models/researchersModel"
import connectDB from "../index"

import { data } from "@data/researchers"

export const addData = async () => {
    try {
        await connectDB()
        const insertData = data.map((item) => {
            return {
                name: item["Name"],
                link: item["Link"]
            }
        })
        await Researcher.insertMany(insertData)
    } catch (error) {
        throw error
    }
}