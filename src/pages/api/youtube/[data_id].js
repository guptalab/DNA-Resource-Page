import connectDB from '@backend/index'
import * as controller from '@backend/controllers/general.controller'
import YoutubeContent from '@backend/models/youtubeContentModel'

const route = async (req, res) => {
    try {
        await connectDB()
        if (req.method === "GET") {
            await controller.getData(YoutubeContent, req, res)
        }
        else if (req.method === "PUT") {
            await controller.updateData(YoutubeContent, req, res)
        }
        else if (req.method === "DELETE") {
            await controller.deleteData(YoutubeContent, req, res)
        }
        else {
            return res.status(405).json({ msg: "Method Not Allowed" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export default route