import connectDB from '@backend/index'
import { parseBibFromFileBuffer } from '@backend/utils/bibParse'
import ArticlePaper from '@backend/models/articlePaperModel'

export const addBibData = async (req, res) => {
    try {
        await connectDB()
        const data = await parseBibFromFileBuffer(req.file.buffer)
        return res.status(200).json({ msg: "data added successfully", data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}