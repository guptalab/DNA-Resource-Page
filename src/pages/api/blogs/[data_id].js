import connectDB from '@backend/index'
import * as controller from '@backend/controllers/general.controller'
import Blog from '@backend/models/blogModel'

const route = async (req, res) => {
    try {
        await connectDB()
        if (req.method === "GET") {
            await controller.getData(Blog, req, res)
        }
        else if (req.method === "PUT") {
            await controller.updateData(Blog, req, res)
        }
        else if (req.method === "DELETE") {
            await controller.deleteData(Blog, req, res)
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