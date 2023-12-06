import connectDB from '@backend/index'
import * as controller from '@backend/controllers/general.controller'
import Company from '@backend/models/companyModel'

const route = async (req, res) => {
    try {
        await connectDB()
        if (req.method === "GET") {
            await controller.getAllData(Company, req, res)
        }
        else if (req.method === "POST") {
            await controller.createData(Company, req, res)
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