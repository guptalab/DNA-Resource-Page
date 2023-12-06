import { createRouter } from 'next-connect';
import multer from 'multer';
import * as controller from '@backend/controllers/article.controller'

export const config = {
    api: {
        bodyParser: false,
    },
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = createRouter()

router.post(upload.single('file'),controller.addBibData)

export default router.handler({
    onNoMatch: (req, res) => {
        return res.status(405).json({ msg: "Method Not Allowed" })
    }
});