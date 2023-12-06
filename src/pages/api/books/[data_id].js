import connectDB from '@backend/index'
import * as controller from '@backend/controllers/general.controller'
import Book from '@backend/models/bookModel'

const route = async (req, res) => {
    try {
        await connectDB()
        if (req.method === "GET") {
            await controller.getData(Book, req, res)
        }
        else if (req.method === "PUT") {
            await controller.updateData(Book, req, res)
        }
        else if (req.method === "DELETE") {
            await controller.deleteData(Book, req, res)
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