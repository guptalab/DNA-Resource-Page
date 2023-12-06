import { getPendingRequests } from "@backend/controllers/user.controller";
import connectDB from "@backend/index";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            await connectDB();
            return getPendingRequests(req, res)
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}