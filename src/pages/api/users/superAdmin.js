import { getSuperUsersNotifications } from "@backend/controllers/user.controller";
import connectDB from "@backend/index";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            await connectDB();
            return getSuperUsersNotifications(req, res);
        } else {
            return res.status(405).json({ msg: 'Method Not Allowed' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};